import { Component, inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { Header } from './components/header/header';
import { AdminHeader } from './components/admin-header/admin-header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AdminHeader, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('client');
  private router = inject(Router);

  // for new header component in admin panel
  currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url)
    ),
    { initialValue: this.router.url }
  );

  isAdminRoute = computed(() => this.currentUrl().startsWith('/admin'));
}
