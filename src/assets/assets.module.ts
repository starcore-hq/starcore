import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';

@Module({
  imports: [AppConfigModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
