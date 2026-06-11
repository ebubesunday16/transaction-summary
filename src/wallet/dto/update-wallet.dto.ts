import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class UpdateWalletDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}
