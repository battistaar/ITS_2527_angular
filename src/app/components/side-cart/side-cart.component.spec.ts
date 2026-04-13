import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCartComponent } from './side-cart.component';

describe('SideCartComponent', () => {
  let component: SideCartComponent;
  let fixture: ComponentFixture<SideCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideCartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideCartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
