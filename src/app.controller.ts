import { Controller, Post, Body } from '@nestjs/common';
import { ChunkService, SequenceCancelableStream } from './app.service';

@Controller('chunks')
export class ChunkController {
  constructor(
    private readonly chunkService: ChunkService,
    private readonly stream: SequenceCancelableStream,
  ) {}

  @Post('process')
  async processChunks(
    @Body() chunks: [string, boolean, number][],
  ): Promise<void> {
    // const formattedChunks = chunks.map(([id, isCancelable, timeout]) => ({
    //   id,
    //   isCancelable,
    //   timeout,
    // }));
    await this.stream.processChunks();
  }
}
