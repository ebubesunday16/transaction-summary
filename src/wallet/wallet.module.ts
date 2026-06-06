import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule], // gives WalletService access to TransactionService
  controllers: [WalletController],
  providers: [WalletService],
  // TransactionService is available via the TransactionModule import (it's exported there)
})
export class WalletModule {}
