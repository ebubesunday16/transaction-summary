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

  // POST /wallet — create a new wallet
  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  // GET /wallet — list all wallets
  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  // GET /wallet/user/:userId — get all wallets belonging to a user
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.walletService.findByUser(userId);
  }

  // GET /wallet/:id — get a single wallet by its id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  // PATCH /wallet/:id/fund — update (fund) a wallet's balance
  @Patch(':id/fund')
  fund(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.fund(id, updateWalletDto);
  }

  // DELETE /wallet/:id — delete a wallet
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }

  // GET /wallet/:id/transactions — transaction history for a specific wallet
  @Get(':id/transactions')
  getTransactions(@Param('id') id: string) {
    // Verify wallet exists first (throws 404 if not)
    this.walletService.findOne(id);
    return this.transactionService.findByWallet(id);
  }
}
