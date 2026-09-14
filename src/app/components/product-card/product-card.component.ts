import { Component, computed, input, output } from '@angular/core';
import { Product } from '../../entities';
import { getDiscountedPrice, getVatPrice } from '../../cart-utils';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/auth.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip';

@Component({
  selector: 'app-product-card',
  imports: [
    CurrencyPipe,
    FormsModule,
    NgbTooltip
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  vat = input<number>(0);

  user = input<User | null>(null);

  onAdd = output<number>();
  onDetail = output<void>();

  quantity: number = 1;

  price = computed(() => {
    const product = this.product();
    let p = getVatPrice(product.netPrice, this.vat());
    p = getDiscountedPrice(p, product.discount);
    return p;
  });

  add() {
    this.onAdd.emit(this.quantity);
  }

  goToDetail() {
    this.onDetail.emit();
  }
}
