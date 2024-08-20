import { Test, TestingModule } from '@nestjs/testing';
import { ChunkService } from './app.service';

describe('ChunkService', () => {
  let service: ChunkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChunkService],
    }).compile();

    service = module.get<ChunkService>(ChunkService);
  });

  it('should ensure that chunks are processed in the correct order with concurrency constraints', async () => {
    const chunks: [string, boolean, number][] = [
      ['chunk1', true, 10],
      ['chunk2', true, 10],
      ['chunk3', false, 1],
      ['chunk4', true, 10],
      ['chunk5', true, 10],
      ['chunk6', false, 1],
      ['chunk7', true, 10],
      ['chunk8', true, 10],
      ['chunk9', false, 1],
      ['chunk10', true, 10],
      ['chunk11', true, 10],
      ['chunk12', false, 1],
    ];

    await service.processChunks(
      chunks.map(([id, isCancelable, timeout]) => ({
        id,
        isCancelable,
        timeout,
      })),
    );
  }, 1000000);

  // it('should correctly process a single cancelable chunk', async () => {
  //   const chunk: [string, boolean, number] = ['single-chunk', true, 10];
  //   await service.processChunks(
  //     [chunk].map(([id, isCancelable, timeout]) => ({
  //       id,
  //       isCancelable,
  //       timeout,
  //     })),
  //   );
  // });

  // it('should correctly process a single non-cancelable chunk', async () => {
  //   const chunk: [string, boolean, number] = ['single-chunk', false, 10];
  //   try {
  //     await service.processChunks(
  //       [chunk].map(([id, isCancelable, timeout]) => ({
  //         id,
  //         isCancelable,
  //         timeout,
  //       })),
  //     );
  //   } catch (error) {
  //     expect(error.message).toBe('Chunk single-chunk failed to process.');
  //   }
  // });

  // it('should not exceed max concurrency when pushed with excessive simultaneous chunks', async () => {
  //   const chunks: [string, boolean, number][] = [
  //     ['chunk1', true, 10],
  //     ['chunk2', true, 10],
  //     ['chunk3', false, 10],
  //   ];

  //   await service.processChunks(
  //     chunks.map(([id, isCancelable, timeout]) => ({
  //       id,
  //       isCancelable,
  //       timeout,
  //     })),
  //   );
  // });

  // it('should continue processing other chunks when one chunk processing fails', async () => {
  //   const chunks: [string, boolean, number][] = [
  //     ['chunk1', true, 10],
  //     ['chunk2', false, 10], // This should fail
  //     ['chunk3', true, 10],
  //   ];

  //   await service.processChunks(
  //     chunks.map(([id, isCancelable, timeout]) => ({
  //       id,
  //       isCancelable,
  //       timeout,
  //     })),
  //   );
  // });
});
