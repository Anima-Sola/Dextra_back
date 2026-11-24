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
      id: uuidv4(),
      createdAt: new Date(),
      content: 'Привет, я получил сообщение от пользователя: ' + data.content,
      userId: data.userId,
      type: 'income',
    };

    const messageDeliveredResponse: MessageDeliveredStatusType = {
      id: data.id,
      status: 'delivered',
      deliveredAt: new Date(),
    };

    client.emit('message:delivered', messageDeliveredResponse);
    client.emit('message', response);
    return response;
  }
}