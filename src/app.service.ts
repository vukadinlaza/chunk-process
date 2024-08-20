import { Injectable } from '@nestjs/common';

interface Chunk {
  id: string;
  isCancelable: boolean;
  timeout: number;
}

@Injectable()
export class ChunkService {
  private concurrencyLimit = 2;
  private activeChunks: number = 0;
  private queue: Chunk[] = [];
  private processing: Promise<void>[] = [];

  async processChunks(chunks: Chunk[]): Promise<void> {
    this.queue.push(...chunks);
    await this.processQueue();
  }

  async processQueue(): Promise<void> {
    console.log('Queue::', this.queue);

    let chunkList = [];
    while (chunkList.length < this.concurrencyLimit && this.queue.length > 0) {
      const chunk = this.queue.shift();
      if (chunk) {
        chunkList.push(chunk);
        if (
          chunkList.length === this.concurrencyLimit ||
          this.queue.length === 0
        ) {
          console.log('List::', chunkList);

          const cancelableChunks = chunkList.filter(
            (chunk) => chunk.isCancelable === false,
          );

          if (cancelableChunks.length === 0) {
            const lastChunk = chunkList[chunkList.length - 1];
            const processingPromise = this.processChunk(lastChunk)
              .then(() => {
                console.log(`Chunk ${lastChunk.id} processed`);
              })
              .catch((error) => {
                console.log(`Error processing chunk ${lastChunk.id}: ${error}`);
              });
            this.processing.push(processingPromise);
          } else {
            for (const chunk of cancelableChunks) {
              const processingPromise = this.processChunk(chunk)
                .then(() => {
                  console.log(`Chunk ${chunk.id} processed`);
                })
                .catch((error) => {
                  console.log(`Error processing chunk ${chunk.id}: ${error}`);
                });
              this.processing.push(processingPromise);
            }
          }

          await Promise.all(this.processing);
          chunkList = [];
          this.processing = [];
        }
      }
    }
  }

  private async processChunk(chunk: Chunk): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}
