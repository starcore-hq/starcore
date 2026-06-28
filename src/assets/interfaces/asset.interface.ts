export interface HorizonAssetRecord {
  _links?: {
    toml?: { href: string };
  };
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  paging_token: string;
  num_claimable_balances?: number;
  num_liquidity_pools?: number;
  num_contracts?: number;
  accounts?: Record<string, number>;
  balances?: Record<string, string>;
  flags?: Record<string, boolean>;
  claimable_balances_amount?: string;
  liquidity_pools_amount?: string;
  contracts_amount?: string;
}

export interface AssetMetadata {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  paging_token: string;
  toml?: string;
  num_claimable_balances?: number;
  num_liquidity_pools?: number;
  num_contracts?: number;
  accounts?: Record<string, number>;
  balances?: Record<string, string>;
  flags?: Record<string, boolean>;
  claimable_balances_amount?: string;
  liquidity_pools_amount?: string;
  contracts_amount?: string;
}

export interface AssetsSearchResult {
  data: AssetMetadata[];
  links: {
    self?: string;
    next?: string;
    prev?: string;
  };
  pagination: {
    limit: number;
    cursor?: string;
    order: 'asc' | 'desc';
    next?: string;
    prev?: string;
  };
}
