export enum TransactionStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
}

export interface Transaction {
  id: string;
  amount: number;
  status: TransactionStatus;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalSuccessfulTransactions: number;
  totalAmount: number;
}
