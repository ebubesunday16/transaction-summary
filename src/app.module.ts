import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { WalletModule } from './wallet/wallet.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [TransactionModule, WalletModule, RatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
