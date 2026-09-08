import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { NewProduct } from '../models/newProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = '/api/products';

  getAllProducts(onlyPublished = false): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?onlyPublished=${onlyPublished}`);
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?search=${searchTerm}`);
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${slug}`);
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  createProduct(productData: NewProduct): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, productData);
  }
}

