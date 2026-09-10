import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  //for sharing cart items across pages without security risks (read only)
  cartItems = computed(() => this.items());

  // updates total prices of product and cart items
  totalPrice = computed(() =>
      this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    this.items.update(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map(item => 
          item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1}
          : item
        );
      } else {
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  }

  removeFromCart(productId: number): void {
    this.items.update(currentItems => 
      currentItems.filter(item => item.product.id !== productId)
      );
    }

  updateQuantity(productId: number, delta: number): void {
    this.items.update(currentItems => {
      const updated = currentItems.map(item =>
        item.product.id === productId
        ? { ...item, quantity: item.quantity + delta }
        : item
      );
      return updated.filter(item => item.quantity > 0);
    });  
    } 
}

  
