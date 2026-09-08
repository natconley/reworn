import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { NewProduct } from '../../models/newProduct';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-new-product',
  imports: [FormsModule],
  templateUrl: './admin-new-product.html',
  styleUrl: './admin-new-product.css',
})
export class AdminNewProduct {
  private productService = inject(ProductService);
  private router = inject(Router);

  formData: NewProduct = {
  name: '',
  description: '',
  image_url: '',
  sku: '',
  price: 0,
  slug: '',
  published_date: '',
  size: '',
  category_id: 0,
  era_id: 0,
  color_id: 0,
  condition_id: 0
};

categories = signal<{ id: number; name: string; }[]>([]);
eras = signal<{ id: number; name: string; }[]>([]);
colors = signal<{ id: number; name: string; }[]>([]);
conditions = signal<{ id: number; name: string; }[]>([]);

constructor() {
  this.productService.getLookUpItems('categories').subscribe(data => {
    this.categories.set(data);
  });

  this.productService.getLookUpItems('eras').subscribe(data => {
    this.eras.set(data);
  });

  this.productService.getLookUpItems('colors').subscribe(data => {
    this.colors.set(data);
  });

  this.productService.getLookUpItems('conditions').subscribe(data => {
    this.conditions.set(data);
  });
}
  onSubmit(): void {
    this.productService.createProduct(this.formData).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
