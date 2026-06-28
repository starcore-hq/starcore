import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SorobanModule } from './soroban/soroban.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    TransactionsModule,
    SorobanModule,
    WebhooksModule,
    SharedModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}