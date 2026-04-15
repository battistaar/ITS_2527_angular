import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';

@Component({
  selector: 'app-product-detail',
  imports: [
    SideCartComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  protected activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      console.log(data);
    })
  }
}
