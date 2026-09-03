import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

   // to show/hide 'new' badge
  get isNew(): boolean {
    const product = this.product();
    if (!product) {
      return false;
    }

    const publishedDate = new Date(product.published_date);
    const pastWeek = new Date();
    pastWeek.setDate(pastWeek.getDate() - 7);
    return publishedDate >= pastWeek;
  }

  product = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => this.productService.getProductBySlug(params.get('slug') ?? ''))
    )
  );
}
