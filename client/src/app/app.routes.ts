import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductDetail } from './pages/product-detail/product-detail';
import { SearchResults } from './pages/search-results/search-results';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { AdminProducts } from './pages/admin-products/admin-products';
import { AdminNewProduct } from './pages/admin-new-product/admin-new-product';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'product/:slug', component: ProductDetail},
    { path: 'search', component: SearchResults},
    { path: 'cart', component: Cart},
    { path: 'checkout', component: Checkout},
    { path: 'admin/products', component: AdminProducts},
    { path: 'admin/products/new', component: AdminNewProduct}
];
