import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  private readonly wallet: Wallet[] = [
      // { id: '1', userId: '1', amount: 500 },
      // { id: '2', userId: '2', amount: 200 },
      // { id: '3', userId: '3', amount: 750 },
    ];

  create(createWalletDto: CreateWalletDto) {
    this.wallet.push(createWalletDto)


    return {
      message: 'your wallet has been created',
      addedItem: createWalletDto
    };
  }

  findAll() {
    return this.wallet;
  }

  findOne(id: string) {
    const filtered = this.wallet.find((item: Wallet) => item.id === id) 
    return {
      message: 'Wallet fetched succesfully',
      filtered
    };
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    const filtered = this.wallet.find(item => item.id === id)
    if (filtered) filtered.balance = updateWalletDto.balance
    return {
      message: 'Your wallet has been updated',
      filtered
    };
  }

  remove(id: string) {
    const index = this.wallet.findIndex(item => item.id === id)
    if (index !== -1){
      this.wallet.splice(index, 1)
    }
    return {
      message: 'wallet has been removed',
      wallets: this.wallet
    };
  }
}
