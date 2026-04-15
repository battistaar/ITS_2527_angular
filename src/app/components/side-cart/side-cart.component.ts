import { Component, computed, inject } from '@angular/core';
import { CartSourceService } from '../../services/cart-source.service';
import { VatService } from '../../services/vat.service';
import { calcCartItem, getTransportFee } from '../../cart-utils';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-cart',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css',
})
export class SideCartComponent {
  cartSrv = inject(CartSourceService);
  vatSrv = inject(VatService);

  source = this.cartSrv.cart;
  vat = this.vatSrv.vat;

  items = computed(() => {
    return this.source().map(item => calcCartItem(item, this.vat()));
  });

  total = computed(() => {
    const totalPrice = this.items().reduce((tot, curr) => tot + curr.totalPrice, 0);
    const totalWeight = this.items().reduce((tot, curr) => tot + curr.totalWeight, 0);
    const transportFee = getTransportFee(totalWeight);
    return totalPrice + transportFee;
  });

  removeItem(id: string) {
    this.cartSrv.removeItem(id);
  }
}
