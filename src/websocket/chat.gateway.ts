import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import type { MessageType, MessageDeliveredStatusType } from '../constants/types.ts';

@WebSocketGateway({ path: '/ws' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: MessageType,
    @ConnectedSocket() client: Socket,
  ): MessageType {
    console.log('Received message:', data);

    const response: MessageType = {
      chatId: data.chatId,
      messageId: uuidv4(),
      createdAt: new Date(),
      content: 'Привет, я получил сообщение от пользователя: ' + data.content,
      userId: data.userId,
      type: 'income',
      status: 'delivered',
    };

    const messageDeliveredResponse: MessageDeliveredStatusType = {
      messageId: data.messageId,
      chatId: data.chatId,
      status: 'delivered',
      deliveredAt: new Date(),
    };

    setTimeout(() => client.emit('message:delivered', messageDeliveredResponse), 40000);
    setTimeout(() => client.emit('message', response), 50000);
    return response;
  }
}