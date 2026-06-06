import { Injectable } from '@nestjs/common';
import { Transaction, TransactionStatus, TransactionSummary } from './transaction.dto';

@Injectable()
export class TransactionService {
  // Simulated transaction data 
  private readonly transactions: Transaction[] = [
    { id: '1', amount: 500, status: TransactionStatus.SUCCESS },
    { id: '2', amount: 200, status: TransactionStatus.FAILED },
    { id: '3', amount: 750, status: TransactionStatus.SUCCESS },
    { id: '4', amount: 100, status: TransactionStatus.PENDING },
    { id: '5', amount: 300, status: TransactionStatus.SUCCESS },
  ];

  getSummary(): TransactionSummary {
    const totalTransactions = this.transactions.length;

    const successfulTransactions = this.transactions.filter(
      (item) => item.status === TransactionStatus.SUCCESS,
    );

    const totalSuccessfulTransactions = successfulTransactions.length;

    const totalAmount = successfulTransactions.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

    return {
      totalTransactions,
      totalSuccessfulTransactions,
      totalAmount,
    };
  }
}
