import { Component, signal } from '@angular/core';
import { cart } from './cart-data';
import { calcCartItem } from './cart-utils';
import { CartItem } from './cart-item.entity';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule, CartItemComponent]
})
export class App {
  items = cart;
}
