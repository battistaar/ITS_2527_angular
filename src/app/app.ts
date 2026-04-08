import { Component, computed, inject, signal } from '@angular/core';
import { CartItem } from './cart-item.entity';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { getVat } from './cart-utils';
import { DEFAULT_COUNTRY_CODE } from './app.config';
import { CartSourceService } from './services/cart-source.service';

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
  protected cartSrv = inject(CartSourceService);

  items = this.cartSrv.cart;
  private defaultCountryCode = inject<string>(DEFAULT_COUNTRY_CODE);
  private countryCode = signal<string>(this.defaultCountryCode);

  vat = computed(() => {
    return getVat(this.countryCode());
  });

  updateItemQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity === null) {
      return;
    }
    if (newQuantity > 0) {
      this.cartSrv.setQuantity(item, newQuantity);
    } else {
      setTimeout(() => {
        this.cartSrv.removeItem(item);
      }, 1000);
    }
  }
}
