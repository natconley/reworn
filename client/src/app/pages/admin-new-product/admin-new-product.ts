import { Component, inject } from '@angular/core';
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

  onSubmit(): void {
    this.productService.createProduct(this.formData).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
