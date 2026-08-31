import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();


  // to show/hide 'new' badge
  get isNew(): boolean {
    const publishedDate = new Date(this.product().published_date);
    const pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 7);
    return publishedDate >= pastWeek;
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
  }
}
