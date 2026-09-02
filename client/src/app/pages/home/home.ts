import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';
import { SpotData } from '../../models/spots';
import { Spot } from '../../components/spot/spot';

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

const spots: SpotData[] = [
  { image: 'images/spots/after-dark.png', heading: 'After Dark', text: 'Leather, sequins and questionable decisions. Everything you need after sunset.', linkText: 'Explore After Dark →', link: '#' },
  { image: 'images/spots/old-soul.png', heading: 'Old Souls', text: 'You were clearly born in the wrong decade, welcome home.', linkText: 'Shop 60s & 70s →', link: '#' },
  { image: 'images/spots/no-occasion.png', heading: 'No Occasion Required', text: 'Saving the good stuff for a special occasion is a terrible waste.', linkText: 'Dress up →', link: '#'  }
];

@Component({
  selector: 'app-home',
  imports: [ProductCard, Spot],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getAllProducts(true), { initialValue: [] });  
  popularProducts = computed(() => this.products().slice(0, 8));
  currentHeroIndex = signal(0);
  spots = spots;

  constructor() {
    setInterval(() => {
      this.currentHeroIndex.update(i => (i + 1) % heroVariants.length);
    }, 12000);
  }

  get currentHero() {
    return heroVariants[this.currentHeroIndex()];
  }
}
