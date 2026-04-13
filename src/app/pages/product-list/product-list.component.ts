import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { VatService } from '../../services/vat.service';
import { CartSourceService } from '../../services/cart-source.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  protected productSrv = inject(ProductService);
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);

  vat = this.vatSrv.vat;
  products = this.productSrv.find();

  add(id: string, quantity: number) {
    this.cartSrv.add(id, quantity);
  }
}
