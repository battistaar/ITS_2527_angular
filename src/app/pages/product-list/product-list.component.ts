import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { VatService } from '../../services/vat.service';
import { CartSourceService } from '../../services/cart-source.service';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  protected productSrv = inject(ProductService);
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);
  protected fb = inject(FormBuilder);

  vat = this.vatSrv.vat;

  filterForm = this.fb.group({
    name: new FormControl<string | null>(''),
    minPrice: new FormControl<number | null>(null, { updateOn: 'submit' }),
    maxPrice: new FormControl<number | null>(null, { updateOn: 'submit' })
  });

  products = this.filterForm.valueChanges
              .pipe(
                startWith({}),
                debounceTime(250),
                switchMap(filter => this.productSrv.find(filter))
              )

  add(id: string, quantity: number) {
    this.cartSrv.add(id, quantity);
  }
}
