import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import { AssetsQueryDto } from './dto/assets-query.dto';
import {
  AssetMetadata,
  AssetsSearchResult,
  HorizonAssetRecord,
} from './interfaces/asset.interface';

interface HorizonAssetsResponse {
  _links?: {
    self?: { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
  _embedded?: {
    records?: HorizonAssetRecord[];
  };
  detail?: string;
  extras?: {
    invalid_field?: string;
    reason?: string;
  };
}

@Injectable()
export class AssetsService {
  constructor(private readonly config: AppConfigService) {}

  async searchAssets(query: AssetsQueryDto): Promise<AssetsSearchResult> {
    const limit = this.normalizeLimit(query.limit);
    const url = this.buildAssetsUrl(query, limit);
    const response = await this.fetchFromHorizon(url);
    const body = (await response.json()) as HorizonAssetsResponse;

    if (!response.ok) {
      this.handleHorizonError(response.status, body);
    }

    const records = body._embedded?.records ?? [];

    return {
      data: records.map((record) => this.mapAsset(record)),
      links: {
        self: body._links?.self?.href,
        next: body._links?.next?.href,
        prev: body._links?.prev?.href,
      },
      pagination: {
        limit,
        cursor: query.cursor,
        order: query.order ?? 'asc',
        next: this.extractCursor(body._links?.next?.href),
        prev: this.extractCursor(body._links?.prev?.href),
      },
    };
  }

  private buildAssetsUrl(query: AssetsQueryDto, limit: number): string {
    const horizonUrl = this.config.stellarHorizonUrl.replace(/\/$/, '');
    const url = new URL(`${horizonUrl}/assets`);

    this.appendParam(url, 'asset_code', query.asset_code);
    this.appendParam(url, 'asset_issuer', query.asset_issuer);
    this.appendParam(url, 'cursor', query.cursor);
    this.appendParam(url, 'limit', limit);
    this.appendParam(url, 'order', query.order ?? 'asc');

    return url.toString();
  }

  private normalizeLimit(limit?: number | string): number {
    const parsedLimit = Number(limit ?? 20);

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      return 20;
    }

    return Math.min(parsedLimit, 200);
  }

  private appendParam(url: URL, key: string, value?: number | string): void {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  private async fetchFromHorizon(url: string): Promise<Response> {
    try {
      return await fetch(url);
    } catch (error) {
      throw new ServiceUnavailableException({
        message: 'Unable to reach Stellar Horizon',
        cause: error instanceof Error ? error.message : String(error),
      });
    }
  }

  private mapAsset(record: HorizonAssetRecord): AssetMetadata {
    return {
      asset_type: record.asset_type,
      asset_code: record.asset_code,
      asset_issuer: record.asset_issuer,
      paging_token: record.paging_token,
      toml: record._links?.toml?.href || undefined,
      num_claimable_balances: record.num_claimable_balances,
      num_liquidity_pools: record.num_liquidity_pools,
      num_contracts: record.num_contracts,
      accounts: record.accounts,
      balances: record.balances,
      flags: record.flags,
      claimable_balances_amount: record.claimable_balances_amount,
      liquidity_pools_amount: record.liquidity_pools_amount,
      contracts_amount: record.contracts_amount,
    };
  }

  private handleHorizonError(
    status: number,
    body: HorizonAssetsResponse,
  ): never {
    const message =
      body.extras?.reason ?? body.detail ?? 'Horizon asset request failed';

    if (status >= 400 && status < 500) {
      throw new BadRequestException({
        message,
        invalid_field: body.extras?.invalid_field,
      });
    }

    throw new BadGatewayException({
      message: 'Stellar Horizon returned an upstream error',
      horizon_status: status,
      detail: message,
    });
  }

  private extractCursor(href?: string): string | undefined {
    if (!href) {
      return undefined;
    }

    try {
      return new URL(href).searchParams.get('cursor') ?? undefined;
    } catch {
      return undefined;
    }
  }
}
