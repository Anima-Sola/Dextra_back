import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from '../src/app.module.js';
import WebSocket, { type RawData } from 'ws';

function decodeMessage(data: RawData): string {
  if (Array.isArray(data)) {
    return Buffer.concat(data).toString('utf8');
  }
  if (data instanceof ArrayBuffer) {
    return Buffer.from(data).toString('utf8');
  }
  return data.toString('utf8');
}

describe('WebSocket echo (e2e)', () => {
  let app: INestApplication;
  let url: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app));
    await app.listen(0, '127.0.0.1');

    const address = app.getHttpServer().address();
    if (address === null || typeof address === 'string') {
      throw new Error('Expected the application to listen on a TCP port');
    }

    url = `ws://127.0.0.1:${address.port}/ws`;
  });

  it('echoes text messages', async () => {
    const client = new WebSocket(url);
    const message = { event: 'message', data: { text: 'hello' } };

    const echoedMessage = new Promise<void>((resolve, reject) => {
      client.on('open', () => client.send(JSON.stringify(message)));
      client.on('message', (data, isBinary) => {
        expect(JSON.parse(decodeMessage(data))).toEqual(message.data);
        expect(isBinary).toBe(false);
        client.close();
        resolve();
      });
      client.on('error', reject);
    });

    await echoedMessage;
  });

  afterEach(async () => {
    await app.close();
  });
});
