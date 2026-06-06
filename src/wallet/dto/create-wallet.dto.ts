import { IsNotEmpty, IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;

  @IsOptional()
  @IsString()
  currency?: string;
}
