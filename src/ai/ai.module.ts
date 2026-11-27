import { Module } from '@nestjs/common';
import { JevModule } from './jev/jev.module.js';

@Module({
  imports: [JevModule],
  exports: [JevModule],
})
export class AiModule {}