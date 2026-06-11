import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TransactionService } from '../transaction/transaction.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.walletService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Patch(':id/fund')
  fund(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.fund(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }

  // GET /wallet/:id/transactions — transaction  for a specific wallet
  @Get(':id/transactions')
  getTransactions(@Param('id') id: string) {
    // Verify wallet exists first (throws 404 if not)
    this.walletService.findOne(id);
    return this.transactionService.findByWallet(id);
  }
}
