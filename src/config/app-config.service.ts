import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppConfigService implements OnModuleInit {
  private readonly logger = new Logger(AppConfigService.name);

  onModuleInit() {
    this.validateConfig();
  }

  private validateConfig() {
    const required = [
      'JWT_SECRET',
      'STELLAR_NETWORK',
      'STELLAR_HORIZON_URL',
    ];

    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      this.logger.warn(
        `Missing optional env vars: ${missing.join(', ')} — using defaults`,
      );
    }

    this.logger.log('Configuration loaded successfully');
  }

  get port(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'default_secret_change_in_production';
  }

  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN || '7d';
  }

  get stellarNetwork(): string {
    return process.env.STELLAR_NETWORK || 'testnet';
  }

  get stellarHorizonUrl(): string {
    return (
      process.env.STELLAR_HORIZON_URL ||
      'https://horizon-testnet.stellar.org'
    );
  }

  get databaseUrl(): string {
    return process.env.DATABASE_URL || '';
  }

  get corsOrigins(): string[] {
    return process.env.CORS_ORIGINS?.split(',') || ['*'];
  }
}