import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { NewProduct } from '../../models/newProduct';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LookUpItem } from '../../models/lookUpItem';

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
  price: 0,
  published_date: '',
  size: '',
  category_id: 0,
  era_id: 0,
  color_id: 0,
  condition_id: 0
};

onCancel(): void {
  const confirmed = confirm('Are you sure you want to leave? Your changes will not be saved.');
  if (confirmed) {
    this.router.navigate(['/admin/products']);
  }
}

categories = signal<LookUpItem[]>([]);
eras = signal<LookUpItem[]>([]);
colors = signal<LookUpItem[]>([]);
conditions = signal<LookUpItem[]>([]);

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
    if (
      !this.formData.name ||
      !this.formData.description ||
      !this.formData.image_url ||
      !this.formData.price ||
      !this.formData.published_date ||
      !this.formData.size ||
      !this.formData.category_id ||
      !this.formData.era_id ||
      !this.formData.color_id ||
      !this.formData.condition_id
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    
    this.productService.createProduct(this.formData).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
