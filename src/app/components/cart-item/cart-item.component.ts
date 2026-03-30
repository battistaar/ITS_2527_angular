import { Component, computed, input, output } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { calcCartItem } from '../../cart-utils';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { DiscountAmountPipe } from '../../pipes/discount-amount.pipe';

@Component({
  selector: 'app-cart-item',
  imports: [FormsModule, CurrencyPipe, DiscountAmountPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();

  vat = input<number>(0);

  private calcItem = computed(() => {
    return calcCartItem(this.item(), this.vat());
  });

  price = computed(() => {
    return this.calcItem().totalPrice;
  });

  discountAmount = computed(() => {
    return this.calcItem().discountAmount;
  });

  quantityChange = output<number>();

  updateQuantity(event: number) {
    this.quantityChange.emit(event);
  }
}
