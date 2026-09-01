import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

interface HeroSlide {
  image: string;
  heading: string;
  subHeading: string;
}

const heroVariants: HeroSlide[] = [
  { image: '/images/hero/hero1.png', heading: 'GET LOST.', subHeading: 'Real treasure is always hidden.' },
  { image: '/images/hero/hero2.png', heading: 'STAY OUT LATE.', subHeading: 'The best stories start after dark.' },
  { image: '/images/hero/hero3.png', heading: 'BE A LITTLE EXTRA.', subHeading: 'Occasion is optional.' }
];

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getAllProducts(true), { initialValue: [] });

  currentHeroIndex = signal(0);

  constructor() {
    setInterval(() => {
      this.currentHeroIndex.update(i => (i + 1) % heroVariants.length);
    }, 12000);
  }

  get currentHero() {
    return heroVariants[this.currentHeroIndex()];
  }
}
