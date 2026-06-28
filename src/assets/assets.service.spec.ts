import {
  BadGatewayException,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AppConfigService } from '../config/app-config.service';

const config = {
  stellarHorizonUrl: 'https://horizon-testnet.stellar.org',
} as AppConfigService;

type MockFetchResponse = Pick<Response, 'json' | 'ok' | 'status'>;

describe('AssetsService', () => {
  let service: AssetsService;
  let fetchMock: jest.Mock<Promise<MockFetchResponse>, [string]>;

  beforeEach(() => {
    service = new AssetsService(config);
    fetchMock = jest.fn<Promise<MockFetchResponse>, [string]>();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('requests Horizon assets with supported search and pagination params', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        _links: { self: { href: 'self-url' } },
        _embedded: { records: [] },
      }),
    });

    await service.searchAssets({
      asset_code: 'USDC',
      asset_issuer: 'GA23M727U7MLWH343WKK7ALOETVHJPHT5UYHHWH54YV52BHEL6YI6YDE',
      cursor: 'cursor-token',
      limit: 10,
      order: 'desc',
    });

    const url = new URL(fetchMock.mock.calls[0][0]);

    expect(`${url.origin}${url.pathname}`).toBe(
      'https://horizon-testnet.stellar.org/assets',
    );
    expect(url.searchParams.get('asset_code')).toBe('USDC');
    expect(url.searchParams.get('asset_issuer')).toBe(
      'GA23M727U7MLWH343WKK7ALOETVHJPHT5UYHHWH54YV52BHEL6YI6YDE',
    );
    expect(url.searchParams.get('cursor')).toBe('cursor-token');
    expect(url.searchParams.get('limit')).toBe('10');
    expect(url.searchParams.get('order')).toBe('desc');
  });

  it('returns matching assets with Horizon metadata and pagination links', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        _links: {
          self: { href: 'self-url' },
          next: {
            href: 'https://horizon-testnet.stellar.org/assets?cursor=next-token&limit=1&order=asc',
          },
          prev: {
            href: 'https://horizon-testnet.stellar.org/assets?cursor=prev-token&limit=1&order=asc',
          },
        },
        _embedded: {
          records: [
            {
              _links: {
                toml: {
                  href: 'https://example.com/.well-known/stellar.toml',
                },
              },
              asset_type: 'credit_alphanum4',
              asset_code: 'USDC',
              asset_issuer:
                'GA23M727U7MLWH343WKK7ALOETVHJPHT5UYHHWH54YV52BHEL6YI6YDE',
              paging_token: 'asset-token',
              num_claimable_balances: 1,
              num_liquidity_pools: 2,
              num_contracts: 3,
              accounts: { authorized: 4, unauthorized: 0 },
              balances: { authorized: '100.0000000' },
              flags: { auth_required: false },
            },
          ],
        },
      }),
    });

    const result = await service.searchAssets({ limit: 1 });

    expect(result.data).toEqual([
      expect.objectContaining({
        asset_type: 'credit_alphanum4',
        asset_code: 'USDC',
        asset_issuer:
          'GA23M727U7MLWH343WKK7ALOETVHJPHT5UYHHWH54YV52BHEL6YI6YDE',
        paging_token: 'asset-token',
        toml: 'https://example.com/.well-known/stellar.toml',
        num_claimable_balances: 1,
        num_liquidity_pools: 2,
        num_contracts: 3,
      }),
    ]);
    expect(result.links).toEqual({
      self: 'self-url',
      next: 'https://horizon-testnet.stellar.org/assets?cursor=next-token&limit=1&order=asc',
      prev: 'https://horizon-testnet.stellar.org/assets?cursor=prev-token&limit=1&order=asc',
    });
    expect(result.pagination).toEqual({
      limit: 1,
      cursor: undefined,
      order: 'asc',
      next: 'next-token',
      prev: 'prev-token',
    });
  });

  it('translates Horizon 4xx validation failures to BadRequestException', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValue({
        detail: 'The request you sent was invalid in some way.',
        extras: {
          invalid_field: 'asset_issuer',
          reason: 'bad is not a valid asset issuer',
        },
      }),
    });

    await expect(
      service.searchAssets({ asset_issuer: 'bad' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('translates Horizon 5xx failures to BadGatewayException', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      json: jest.fn().mockResolvedValue({ detail: 'Service unavailable' }),
    });

    await expect(service.searchAssets({})).rejects.toBeInstanceOf(
      BadGatewayException,
    );
  });

  it('translates network failures to ServiceUnavailableException', async () => {
    fetchMock.mockRejectedValue(new Error('connection failed'));

    await expect(service.searchAssets({})).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });
});
