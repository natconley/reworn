import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../components/product-card/product-card';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
 


  currentIndex = 0;
  // changes items per view based on screen size
  // does not listen for changes in screen size in this iteration
    itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;

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

  // similar products carousel
  get visibleSimilarProducts() {
    return (
      this.product()?.similarProducts?.slice(
        this.currentIndex,
        this.currentIndex + this.itemsPerView
      ) ?? []
    );
  }

  nextSimilar() {
    const products = this.product()?.similarProducts ?? [];

    if (this.currentIndex + this.itemsPerView < products.length) {
      this.currentIndex++;
    }
  }

  previousSimilar() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      }
    }

    onAddToCart(): void {
      const product = this.product();
      if (product) {
        this.cartService.addToCart(product);
      }
    }

}
