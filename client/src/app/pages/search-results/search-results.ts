import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';



@Component({
  selector: 'app-search-results',
  imports: [ProductCard],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  // hämtar söktermen till sidans rubrik
  searchTerm = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('search') ?? ''))
  );

  // hämtar sökta produkter
  products = toSignal(
    this.route.queryParamMap.pipe(
      switchMap(params => this.productService.searchProducts(params.get('search') ?? ''))
    ),
  { initialValue: [] }
  );
}
