import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(() => {
    service = new AppConfigService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return default port 3000', () => {
    delete process.env.PORT;
    expect(service.port).toBe(3000);
  });

  it('should return port from env', () => {
    process.env.PORT = '4000';
    expect(service.port).toBe(4000);
    delete process.env.PORT;
  });

  it('should return development as default nodeEnv', () => {
    delete process.env.NODE_ENV;
    expect(service.nodeEnv).toBe('development');
  });

  it('should return testnet as default stellarNetwork', () => {
    delete process.env.STELLAR_NETWORK;
    expect(service.stellarNetwork).toBe('testnet');
  });

  it('should return default horizon url', () => {
    delete process.env.STELLAR_HORIZON_URL;
    expect(service.stellarHorizonUrl).toBe(
      'https://horizon-testnet.stellar.org',
    );
  });

  it('isDevelopment should return true in development', () => {
    process.env.NODE_ENV = 'development';
    expect(service.isDevelopment).toBe(true);
  });
});