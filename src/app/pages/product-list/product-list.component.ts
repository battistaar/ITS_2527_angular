import { Component, inject } from '@angular/core';
import { ProductFilter, ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { VatService } from '../../services/vat.service';
import { CartSourceService } from '../../services/cart-source.service';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, filter, from, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { ProductFilterComponent, ProductFilterEvent } from '../../components/product-filter/product-filter.component';
import { SideCartComponent } from "../../components/side-cart/side-cart.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    AsyncPipe,
    ReactiveFormsModule,
    ProductFilterComponent,
    SideCartComponent
],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  protected productSrv = inject(ProductService);
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);
  protected router = inject(Router);

  protected filters$ = new Subject<ProductFilter>();

  vat = this.vatSrv.vat;

  products$ = this.filters$
                .pipe(
                  startWith({}),
                  debounceTime(250),
                  switchMap(filter => this.productSrv.find(filter))
                );

  add(id: string, quantity: number) {
    this.cartSrv.add(id, quantity);
  }

  setFilters(filters: ProductFilterEvent) {
    this.filters$.next(filters);
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/products', id]);
  }
}
