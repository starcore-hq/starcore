import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

interface AssetsE2eResponse {
  data: Array<{ asset_code: string }>;
  pagination: { limit: number };
}

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/assets (GET)', () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        _links: { self: { href: 'self-url' } },
        _embedded: {
          records: [
            {
              asset_type: 'credit_alphanum4',
              asset_code: 'USDC',
              asset_issuer:
                'GA23M727U7MLWH343WKK7ALOETVHJPHT5UYHHWH54YV52BHEL6YI6YDE',
              paging_token: 'asset-token',
            },
          ],
        },
      }),
    });

    return request(app.getHttpServer())
      .get('/assets?asset_code=USDC&limit=1')
      .expect(200)
      .expect((response) => {
        const body = response.body as AssetsE2eResponse;

        expect(body.data[0].asset_code).toBe('USDC');
        expect(body.pagination.limit).toBe(1);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
