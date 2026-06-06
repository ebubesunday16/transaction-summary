import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import type { TransactionSummary } from './transaction.interface';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('summary')
  getSummary(): TransactionSummary {
    return this.transactionService.getSummary();
  }

  @Get('wallet/:walletId')
  findByWallet(@Param('walletId') walletId: string) {
    return this.transactionService.findByWallet(walletId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.transactionService.findByUser(userId);
  }
}
