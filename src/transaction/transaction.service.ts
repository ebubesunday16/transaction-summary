import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionStatus, TransactionType } from './transaction.enum';
import { TransactionSummary } from './transaction.interface';

@Injectable()
export class TransactionService {
  private readonly transactions: Transaction[] = [];

  
  record(params: {
    walletId: string;
    userId: string;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    description: string;
  }): Transaction {
    const transaction = new Transaction(params);
    this.transactions.push(transaction);
    return transaction;
  }

  
  findByWallet(walletId: string): Transaction[] {
    return this.transactions.filter((t) => t.walletId === walletId);
  }


  findByUser(userId: string): Transaction[] {
    return this.transactions.filter((t) => t.userId === userId);
  }


  getSummary(): TransactionSummary {
    const totalTransactions = this.transactions.length;

    const successful = this.transactions.filter(
      (t) => t.status === TransactionStatus.SUCCESS,
    );
    const failed = this.transactions.filter(
      (t) => t.status === TransactionStatus.FAILED,
    );

    const totalAmount = successful.reduce((acc, t) => acc + t.amount, 0);

    return {
      totalTransactions,
      totalSuccessfulTransactions: successful.length,
      totalFailedTransactions: failed.length,
      totalAmount,
    };
  }
}
