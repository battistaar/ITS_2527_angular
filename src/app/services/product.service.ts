import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private internal = signal<Product[]>([]);
  products = this.internal.asReadonly();

  constructor() {
    this.fetch();
  }

  fetch() {
    this.http.get<Product[]>('/api/products').subscribe(items => {
      this.internal.set(items);
    })
  }

}
