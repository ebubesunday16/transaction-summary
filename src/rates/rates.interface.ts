export interface NgnRates {
  base: string;
  rates: {
    USD: number;
    KES: number;
    GHS: number;
    GBP: number;
    AUD: number;
    CAD: number;
  };
  source: string;
}
