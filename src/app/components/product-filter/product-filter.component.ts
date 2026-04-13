import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';

export type ProductFilterEvent = {
  name: string | null,
  minPrice: number | null,
  maxPrice: number | null
}

@Component({
  selector: 'app-product-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  protected destroyed$ = new Subject<void>();
  protected fb = inject(FormBuilder);

  filterChange = output<ProductFilterEvent>();

  filterForm = this.fb.group({
      name: new FormControl<string | null>(''),
      minPrice: new FormControl<number | null>(
        null,
        {
          updateOn: 'submit',
          validators: [Validators.min(0)]
        }
      ),
      maxPrice: new FormControl<number | null>(
        null,
        {
          updateOn: 'submit',
          validators: [Validators.min(0)]
        }
      )
    });

  ngOnInit() {
    this.filterForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter(() => this.filterForm.valid),
        //startWith({}),
      ).subscribe(filter => {
        this.filterChange.emit(filter as ProductFilterEvent);
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
