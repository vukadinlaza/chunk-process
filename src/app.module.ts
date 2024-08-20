import { Module } from '@nestjs/common';
import { ChunkController } from './app.controller';
import { ChunkService } from './app.service';

@Module({
  imports: [],
  controllers: [ChunkController],
  providers: [ChunkService],
})
export class AppModule {}
