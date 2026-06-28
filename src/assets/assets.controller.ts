import { Controller, Get, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsQueryDto } from './dto/assets-query.dto';
import { AssetsSearchResult } from './interfaces/asset.interface';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  searchAssets(@Query() query: AssetsQueryDto): Promise<AssetsSearchResult> {
    return this.assetsService.searchAssets(query);
  }
}
