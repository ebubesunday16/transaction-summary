import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionStatus, TransactionType } from '../transaction/transaction.enum';

@Injectable()
export class WalletService {
  private readonly wallets: Wallet[] = [];

  constructor(private readonly transactionService: TransactionService) {}

  create(createWalletDto: CreateWalletDto): { message: string; wallet: Wallet } {
    const wallet: Wallet = {
      id: randomUUID(),
      userId: createWalletDto.userId,
      balance: createWalletDto.balance ?? 0,
      currency: createWalletDto.currency ?? 'NGN',
      createdAt: new Date(),
    };

    this.wallets.push(wallet);

    return {
      message: 'Wallet created successfully',
      wallet,
    };
  }

  findAll(): Wallet[] {
    return this.wallets;
  }

  findByUser(userId: string): { message: string; wallets: Wallet[] } {
    const userWallets = this.wallets.filter((w) => w.userId === userId);
    return {
      message: `Found ${userWallets.length} wallet(s) for user ${userId}`,
      wallets: userWallets,
    };
  }

  findOne(id: string): { message: string; wallet: Wallet } {
    const wallet = this.wallets.find((w) => w.id === id);
    if (!wallet) {
      throw new NotFoundException(`Wallet with id "${id}" not found`);
    }
    return {
      message: 'Wallet fetched successfully',
      wallet,
    };
  }

  fund(
    id: string,
    updateWalletDto: UpdateWalletDto,
  ): { message: string; wallet: Wallet; transaction: ReturnType<TransactionService['record']> } {
    const wallet = this.wallets.find((w) => w.id === id);
    if (!wallet) {
      throw new NotFoundException(`Wallet with id "${id}" not found`);
    }

    const { amount } = updateWalletDto;

    // Record the transaction before mutating the wallet
    const transaction = this.transactionService.record({
      walletId: wallet.id,
      userId: wallet.userId,
      amount,
      type: TransactionType.CREDIT,
      status: TransactionStatus.SUCCESS,
      description: `Funded wallet with ${amount} ${wallet.currency}`,
    });

    wallet.balance += amount;

    return {
      message: 'Wallet funded successfully',
      wallet,
      transaction,
    };
  }

  remove(id: string): { message: string } {
    const index = this.wallets.findIndex((w) => w.id === id);
    if (index === -1) {
      throw new NotFoundException(`Wallet with id "${id}" not found`);
    }
    this.wallets.splice(index, 1);
    return {
      message: 'Wallet deleted successfully',
    };
  }
}
