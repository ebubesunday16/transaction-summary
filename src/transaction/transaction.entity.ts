import { randomUUID } from 'crypto';
import { TransactionStatus, TransactionType } from './transaction.enum';

export class Transaction {
  id: string;
  walletId: string;
  userId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  createdAt: Date;

  constructor(params: Omit<Transaction, 'id' | 'createdAt'>) {
    this.id = randomUUID();
    this.walletId = params.walletId;
    this.userId = params.userId;
    this.amount = params.amount;
    this.type = params.type;
    this.status = params.status;
    this.description = params.description;
    this.createdAt = new Date();
  }
}
