import { Component } from '@angular/core';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-container',
  imports: [SideCartComponent, RouterOutlet],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.css',
})
export class ProductContainerComponent {}
