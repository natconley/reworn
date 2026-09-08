import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  imports: [],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  // for manually updating product list after delete
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products.set(products);
    });
  }

  isPublished(publishedDate: string): boolean {
    return new Date(publishedDate) <= new Date();
  }

  onDelete(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
