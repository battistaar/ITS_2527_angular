import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { VatService } from '../../services/vat.service';
import { calcCartItem } from '../../cart-utils';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { DiscountAmountPipe } from '../../pipes/discount-amount.pipe';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartSourceService } from '../../services/cart-source.service';
import { AuthService } from '../../services/auth.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap/tooltip';

@Component({
  selector: 'app-product-detail',
  imports: [
    CurrencyPipe,
    DiscountAmountPipe,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    NgbTooltip
],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  protected activatedRoute = inject(ActivatedRoute);
  protected productSrv = inject(ProductService);
  protected vatSrv = inject(VatService);
  protected cartSrv = inject(CartSourceService);
  protected authSrv = inject(AuthService);

  user = this.authSrv.currentUser;

  productId$ = this.activatedRoute.params
    .pipe(
      map(params => params['id'] as string)
    );

  product$ = this.productId$
    .pipe(
      switchMap(id => this.productSrv.getById(id))
    );

  vat$ = toObservable(this.vatSrv.vat);

  private cartItem$ = combineLatest([
                this.product$,
                this.vat$
              ]).pipe(
                map(([product, vat]) => {
                  const tmp = {
                    id: '',
                    quantity: 1,
                    product
                  };
                  return calcCartItem(tmp, vat);
                })
              );

  price$ = this.cartItem$.pipe(map((item => item.totalPrice)));

  discountAmount$ = this.cartItem$.pipe(map((item => item.discountAmount)));

  quantityInput = new FormControl(1, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)]
  });

  constructor() {
    effect(() => {
      if (this.user()) {
        this.quantityInput.enable();
      } else {
        this.quantityInput.disable();
      }
    });
  }

  addToCart(id: string) {
    if(this.quantityInput.valid) {
      this.cartSrv.add(id, this.quantityInput.value);
    }
  }
}
