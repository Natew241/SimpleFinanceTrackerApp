import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryBreakdown } from './category-breakdown';

describe('CategoryBreakdown', () => {
  let component: CategoryBreakdown;
  let fixture: ComponentFixture<CategoryBreakdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBreakdown],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryBreakdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
