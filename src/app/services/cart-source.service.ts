import { CartItem } from './../cart-item.entity';
import { Injectable, signal } from '@angular/core';

const cart: CartItem[] = [
  {
    id: '1',
    quantity: 2,
    product: {
      id: '1',
      name: 'ssd',
      netPrice: 95,
      weight: 100,
      discount: 5,
    },
  },
  {
    id: '2',
    quantity: 1,
    product: {
      id: '2',
      name: 'motherboard',
      netPrice: 270,
      weight: 900,
      discount: 0
    }
  },
  {
    id: '3',
    quantity: 2,
    product: {
      id: '3',
      name: 'ram',
      netPrice: 120,
      weight: 60,
      discount: 10,
    }
  },
  {
    id: '4',
    quantity: 1,
    product: {
      id: '4',
      name: 'processor',
      netPrice: 400,
      weight: 130,
      discount: 0,
    }
  },
  {
    id: '5',
    quantity: 1,
    product: {
      id: '5',
      name: 'power supply',
      netPrice: 130,
      weight: 1400,
      discount: 15,
    }
  },
  {
    id: '6',
    quantity:1,
    product: {
      id: '6',
      name: 'cpu cooler',
      netPrice: 170,
      weight: 1000,
      discount: 23
    }
  },
  {
    id: '7',
    quantity: 1,
    product: {
      id: '7',
      name: 'gpu',
      netPrice: 1600,
      weight: 2500,
      discount: 0
    }
  },
  {
    id: '8',
    quantity: 1,
    product: {
      id: '8',
      name: 'case',
      netPrice: 130,
      weight: 3500,
      discount: 30
    }
  }
];
@Injectable({
  providedIn: 'root',
})
export class CartSourceService {
  private internal = signal<CartItem[]>(cart);
  cart = this.internal.asReadonly();

  setQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 0) {
      newQuantity = 0;
    }
    const index = this.internal().indexOf(item);
    const clone = structuredClone(this.internal());
    clone[index].quantity = newQuantity;
    this.internal.set(clone);
  }

  removeItem(item: CartItem): void {
    const index = this.internal().indexOf(item);
    const clone = structuredClone(this.internal());
    clone.splice(index, 1);
    this.internal.set(clone);
  }
}
