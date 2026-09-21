import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../../components/product-card/product-card';
import { CartService } from '../../services/cart';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  imports: [ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private productService = inject(ProductService);
  cartService = inject(CartService);


  currentIndex = 0;
  // changes items per view based on screen size
  // does not listen for changes in screen size in this iteration
    itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;

  constructor() {
    effect(() => {
      const product = this.product();
      this.currentIndex = 0;
      if (product) {
        this.titleService.setTitle(`${product.name} | REWORN`);
      }
    });
  }

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

  // toggle add to cart button
  get isInCart(): boolean {
      const product = this.product();
      return product ? this.cartService.isInCart(product.id) : false;
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
