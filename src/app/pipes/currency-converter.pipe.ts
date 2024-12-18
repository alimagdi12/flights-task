import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
  standalone: false,
})
export class CurrencyConverterPipe implements PipeTransform {
  private readonly conversionRate = 165.11;

  transform(value: number): string {
    if (!value) return 'Invalid amount';
    const convertedValue = value * this.conversionRate;
    return `${convertedValue.toFixed(2)} EGP`;
  }
}
