import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { VatService } from '../../services/vat.service';
import { calcCartItem } from '../../cart-utils';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { DiscountAmountPipe } from '../../pipes/discount-amount.pipe';

@Component({
  selector: 'app-product-detail',
  imports: [
    SideCartComponent,
    CurrencyPipe,
    DiscountAmountPipe,
    AsyncPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  protected activatedRoute = inject(ActivatedRoute);
  protected productSrv = inject(ProductService);
  protected vatSrv = inject(VatService);

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
}


// import { Component, computed, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { SideCartComponent } from '../../components/side-cart/side-cart.component';
// import { switchMap } from 'rxjs';
// import { ProductService } from '../../services/product.service';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { Product } from '../../entities';
// import { VatService } from '../../services/vat.service';
// import { calcCartItem } from '../../cart-utils';
// import { CurrencyPipe } from '@angular/common';
// import { DiscountAmountPipe } from '../../pipes/discount-amount.pipe';

// @Component({
//   selector: 'app-product-detail',
//   imports: [
//     SideCartComponent,
//     CurrencyPipe,
//     DiscountAmountPipe
//   ],
//   templateUrl: './product-detail.component.html',
//   styleUrl: './product-detail.component.css',
// })
// export class ProductDetailComponent {
//   protected activatedRoute = inject(ActivatedRoute);
//   protected productSrv = inject(ProductService);
//   protected vatSrv = inject(VatService);

//   product$ = this.activatedRoute.params
//     .pipe(
//       switchMap(params => this.productSrv.getById(params['id']))
//     );

//   product = toSignal(this.product$);

//   vat = this.vatSrv.vat;

//   private cartItem = computed(() => {
//     const product = this.product();
//     if (!product) {
//       return null;
//     }
//     const tmp = {
//       id: '',
//       quantity: 1,
//       product
//     }
//     return calcCartItem(tmp, this.vat());
//   });

//   price = computed(() => {
//     const c = this.cartItem();
//     return c ? c.totalPrice : 0;
//   });

//   discountAmount = computed(() => {
//     const c = this.cartItem();
//     return c ? c.discountAmount: 0;
//   });
// }
