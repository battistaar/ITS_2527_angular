import { Component, signal } from '@angular/core';
import { cart } from './cart-data';
import { calcCartItem } from './cart-utils';
import { CartItem } from './cart-item.entity';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    FormsModule,
    CartItemComponent,
    SummaryComponent
  ]
})
export class App {
  items = cart;

  updateItemQuantity(item: CartItem, newQuantity: number) {
    item.quantity = newQuantity;
  }
}
