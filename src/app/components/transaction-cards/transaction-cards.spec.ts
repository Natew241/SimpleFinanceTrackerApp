import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionCards } from './transaction-cards';

describe('TransactionCards', () => {
  let component: TransactionCards;
  let fixture: ComponentFixture<TransactionCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCards],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
