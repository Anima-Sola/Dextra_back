import { Module } from '@nestjs/common';
import { JevService } from './jev.service.js';

@Module({
  providers: [JevService],
  exports: [JevService],
})
export class JevModule {}