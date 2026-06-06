import { Controller, Get } from '@nestjs/common';
import { RatesService } from './rates.service';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get('ngn')
  getNgnRates() {
    return this.ratesService.getNgnRates();
  }
}
