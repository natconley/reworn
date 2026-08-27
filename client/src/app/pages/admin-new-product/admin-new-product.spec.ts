import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewProduct } from './admin-new-product';

describe('AdminNewProduct', () => {
  let component: AdminNewProduct;
  let fixture: ComponentFixture<AdminNewProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewProduct],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNewProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
