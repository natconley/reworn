import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = '/api/products';

  getAllProducts(onlyPublished = false): Observable<Product[]> {
    return this.http.get<Product[]>((`${this.baseUrl}?onlyPublished=${onlyPublished}`));
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>((`${this.baseUrl}/search?search=${searchTerm}`));
  }
}
