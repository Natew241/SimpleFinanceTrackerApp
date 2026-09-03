import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-summary-cards',
  styleUrl: './summary-cards.css',
  templateUrl: './summary-cards.html',
})
export class SummaryCards {
  @Input() totalIncome = 0;
  @Input() totalExpenses = 0;
  @Input() balance = 0;
}
