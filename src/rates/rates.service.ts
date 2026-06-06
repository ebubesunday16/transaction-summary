import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NgnRates } from './rates.interface';

@Injectable()
export class RatesService {
  private readonly BASE_URL = 'https://open.er-api.com/v6/latest/NGN';

  constructor(private readonly httpService: HttpService) {}

  async getNgnRates(): Promise<NgnRates> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(this.BASE_URL));

      const targetCurrencies = ['USD', 'KES', 'GHS', 'GBP', 'AUD', 'CAD'];
      const filteredRates: Record<string, number> = {};

      for (const currency of targetCurrencies) {
        if (data.rates && data.rates[currency] !== undefined) {
          filteredRates[currency] = data.rates[currency];
        }
      }

      return {
        base: 'NGN',
        rates: filteredRates as NgnRates['rates'],
        source: 'open.er-api.com',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch currency rates. Please try again later.',
      );
    }
  }
}
