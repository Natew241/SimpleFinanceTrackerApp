import { Component, inject} from '@angular/core';
import { Transaction, TransactionFilterType } from './models/transaction';
import { TransactionService } from './services/transaction-service';
import { TransactionList } from './components/transaction-list/transaction-list';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { TransactionForm } from './components/transaction-form/transaction-form';

@Component({
  imports: [TransactionList, SummaryCards, TransactionForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private transactionService = inject(TransactionService)
  
  selectedTypeFilter: TransactionFilterType = 'all';
  selectedCategoryFilter = 'all';
  selectedMonthFilter = 'all';

  setSelectedFilterType(type: TransactionFilterType): void {
  this.selectedTypeFilter = type;
}

setSelectedCategory(category: string): void {
  this.selectedCategoryFilter = category;
}

setSelectedMonth(month: string): void {
  this.selectedMonthFilter = month;
}

  getTotalIncome(): number {
  return this.transactionService.getTotalForTransactions(
    this.getFilteredTransactions(),
    'income'
  );
}

getTotalExpenses(): number {
  return this.transactionService.getTotalForTransactions(
    this.getFilteredTransactions(),
    'expense'
  );
}

getBalance(): number {
  return this.getTotalIncome() - this.getTotalExpenses();
}

  getFilteredTransactions(): Transaction[] {
  return this.transactionService.getFilteredTransactions(
    this.selectedTypeFilter,
    this.selectedCategoryFilter,
    this.selectedMonthFilter
  );
}

getCategories(): string[] {
  return this.transactionService.getCategories();
}

getMonths(): string[] {
  return this.transactionService.getMonths();
}

addTransaction(transaction: Transaction): void {
  this.transactionService.addTransaction(transaction);
}

deleteTransaction(id: number): void {
  this.transactionService.deleteTransaction(id);
}
}
