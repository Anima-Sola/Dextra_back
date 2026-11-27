import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ChatGateway } from './websocket/chat.gateway.js';
import { AiModule } from './ai/ai.module.js';

@Module({
  imports: [AiModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
