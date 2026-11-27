import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import type { MessageType, MessageDeliveredStatusType } from '../constants/types.js';
import { JevService } from '../ai/jev/jev.service.js';

@WebSocketGateway({ path: '/ws' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly jevService: JevService) {}

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: MessageType & { text?: string },
    @ConnectedSocket() client: Socket,
  ): Promise<MessageType | { text: string }> {
    console.log('Received message:', data);

    if (typeof data.text === 'string') {
      return { text: data.text };
    }

    const messageDeliveredResponse: MessageDeliveredStatusType = {
      messageId: data.messageId,
      chatId: data.chatId,
      status: 'delivered',
      deliveredAt: new Date(),
    };

    client.emit('message:delivered', messageDeliveredResponse);

    const jevResponse = await this.jevService.evaluate(data.content);

    const response: MessageType = {
      chatId: data.chatId,
      messageId: uuidv4(),
      createdAt: new Date(),
      content: JSON.stringify(jevResponse),
      userId: data.userId,
      type: 'income',
      status: 'delivered',
    };

    client.emit('message', response);
    return response;
  }
}