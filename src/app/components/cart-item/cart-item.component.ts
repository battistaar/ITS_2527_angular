import { Component, Input, input } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { calcCartItem } from '../../cart-utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  imports: [FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  item = input.required<CartItem>();

  getItemPrice(item: CartItem): number {
    const calcItem = calcCartItem(item, 0.22);
    return calcItem.totalPrice;
  }
}
