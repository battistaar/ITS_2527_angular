import { Component, inject } from '@angular/core';
import { ProductFilter, ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { VatService } from '../../services/vat.service';
import { CartSourceService } from '../../services/cart-source.service';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, map, ReplaySubject, shareReplay, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ProductFilterComponent, ProductFilterEvent } from '../../components/product-filter/product-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy } from 'lodash';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    AsyncPipe,
    ReactiveFormsModule,
    ProductFilterComponent,
],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  protected productSrv = inject(ProductService);
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  vat = this.vatSrv.vat;

  protected updateQueryParams$ = new ReplaySubject<ProductFilter>(1);

  protected filters$ = this.activatedRoute.queryParams
                        .pipe(
                          map(params => {
                            return {
                              name: params['name'] as string,
                              minPrice: params['minPrice'] ? parseFloat(params['minPrice']) : null,
                              maxPrice: params['maxPrice'] ? parseFloat(params['maxPrice']) : null
                            }
                          })
                        );

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
    const q = omitBy(filters, val => val === '');
    this.router.navigate([], {queryParams: q});
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/products', id]);
  }
}
