import { Component, computed, effect, input, output } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { calcCartItem } from '../../cart-utils';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { DiscountAmountPipe } from '../../pipes/discount-amount.pipe';
import { debounceTime, Subject, Subscription, takeUntil } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart-item',
  imports: [ReactiveFormsModule, CurrencyPipe, DiscountAmountPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  item = input.required<CartItem>();

  vat = input<number>(0);

  quantityChange = output<number>();

  quantityInput = new FormControl<number>(0, { nonNullable: true });

  private quantityChangeSignal = toSignal(
    this.quantityInput.valueChanges
      .pipe(
        debounceTime(300)
      )
    );

  constructor() {
    effect(() => {
      this.quantityInput.patchValue(this.item().quantity, { emitEvent: false });
    })

    effect(() => {
      const val = this.quantityChangeSignal();
      if (val !== undefined) {
        this.updateQuantity(val);
      }
    })
  }

  private calcItem = computed(() => {
    return calcCartItem(this.item(), this.vat());
  });

  price = computed(() => {
    return this.calcItem().totalPrice;
  });

  discountAmount = computed(() => {
    return this.calcItem().discountAmount;
  });


  updateQuantity(event: number) {
    this.quantityChange.emit(event);
  }
}

// private $destroy = new Subject<void>();
// private $destroy = new Subject<void>();

//   constructor() {
//     effect(() => {
//       this.quantityInput.patchValue(this.item().quantity, { emitEvent: false });
//     })
//   }

//   ngOnInit() {
//     this.quantityInput.valueChanges
//       .pipe(
//         takeUntil(this.$destroy),
//         debounceTime(300)
//       )
//       .subscribe(val => {
//         this.updateQuantity(val)
//       });
//   }

//   ngOnDestroy() {
//     //this.quantitySub?.unsubscribe();
//     this.$destroy.next();
//     this.$destroy.complete();
//   }
