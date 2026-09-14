import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router = inject(Router);
  cartService = inject(CartService);

  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  searchTerm = '';
  onSearch(): void {
    this.router.navigate(['/search'], {queryParams: { search: this.searchTerm } });
    this.searchTerm = '';
  }
}
