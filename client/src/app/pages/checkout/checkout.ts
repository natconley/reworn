import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cartService = inject(CartService);
}
