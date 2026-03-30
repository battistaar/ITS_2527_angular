import { Component, computed, input } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { calcCartItem, getTransportFee } from '../../cart-utils';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CurrencyPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  items = input<CartItem[]>([]);
  vat = input<number>(0);

  summary = computed(() => {
    return this.getSummary();
  })

  private getSummary() {
    const calcList = this.items().map(item => calcCartItem(item, this.vat()));

    const netPrice = calcList.reduce((total, item) => {
        return total + item.totalNetPrice;
    }, 0);

    const vatValue = calcList.reduce((total, item) => {
        return total + (item.totalPrice - item.totalNetPrice);
    }, 0);

    const total = calcList.reduce((total, item) => {
        return total + item.totalPrice;
    }, 0);

    const totalWeight = calcList.reduce((total, item) => {
        return total + item.totalWeight;
    }, 0);

    const transportFee = getTransportFee(totalWeight);

    return {
      netPrice,
      vatValue,
      transportFee,
      total: total + transportFee
    }
  }
}
