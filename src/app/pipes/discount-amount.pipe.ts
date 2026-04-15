import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountAmount'
})
export class DiscountAmountPipe implements PipeTransform {
  currencyPipe = inject(CurrencyPipe);

  transform(value: number | null): string {
    const currencyString = this.currencyPipe.transform(value);
    return value ? `(-${currencyString})` : '';
  }
}
