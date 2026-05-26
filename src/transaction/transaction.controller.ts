import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import type { TransactionSummary } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('summary')
  getSummary(): TransactionSummary {
    return this.transactionService.getSummary();
  }
}
