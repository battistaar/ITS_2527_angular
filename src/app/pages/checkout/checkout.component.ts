import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { SummaryComponent } from '../../components/summary/summary.component';
import { CartItem } from '../../cart-item.entity';
import { CartSourceService } from '../../services/cart-source.service';
import { VatService } from '../../services/vat.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  imports: [
      FormsModule,
      CartItemComponent,
      SummaryComponent
  ]
})
export class CheckoutComponent {
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);

  items = this.cartSrv.cart;
  vat = this.vatSrv.vat;

  updateItemQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity === null) {
      return;
    }
    if (newQuantity > 0) {
      this.cartSrv.setQuantity(item.id, newQuantity);
    } else {
      this.cartSrv.removeItem(item.id);
    }
  }
}
