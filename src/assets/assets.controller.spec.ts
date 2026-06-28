import { Test, TestingModule } from '@nestjs/testing';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';

const assetsResult = {
  data: [],
  links: {},
  pagination: { limit: 20, order: 'asc' as const },
};

describe('AssetsController', () => {
  let controller: AssetsController;
  let service: { searchAssets: jest.Mock };

  beforeEach(async () => {
    service = { searchAssets: jest.fn().mockResolvedValue(assetsResult) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [{ provide: AssetsService, useValue: service }],
    }).compile();

    controller = module.get<AssetsController>(AssetsController);
  });

  it('delegates asset search query params to AssetsService', async () => {
    const query = { asset_code: 'USDC', limit: 10 };

    await expect(controller.searchAssets(query)).resolves.toBe(assetsResult);
    expect(service.searchAssets).toHaveBeenCalledWith(query);
  });
});
