import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogSchema } from './log.entity';
import { LogService } from './log.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogSchema])],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
