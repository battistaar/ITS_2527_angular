import { Component } from '@angular/core';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IfAuthenticatedDirective } from '../../utils/if-authenticated.directive';

@Component({
  selector: 'app-product-container',
  imports: [
    SideCartComponent,
    RouterOutlet,
    IfAuthenticatedDirective
  ],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.css',
})
export class ProductContainerComponent {
}
