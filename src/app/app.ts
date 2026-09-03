import { Component } from '@angular/core';
import { Transaction, TransactionFilterType } from './models/transaction';
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
  transactions: Transaction[] = [
    {
      id: 1,
      title: 'Paycheck',
      amount: 2500,
      type: 'income',
      category: 'Salary',
      date: '2026-09-01',
    },
    {
      id: 2,
      title: 'Groceries',
      amount: 82.45,
      type: 'expense',
      category: 'Food',
      date: '2026-09-02',
    },
    {
      id: 3,
      title: 'Internet Bill',
      amount: 65,
      type: 'expense',
      category: 'Utilities',
      date: '2026-09-02',
    },
  ];

  selectedTypeFilter: TransactionFilterType = 'all';

  setSelectedFilterType(type: TransactionFilterType): void {
    this.selectedTypeFilter = type;
  }

  getFilteredTransactions(): Transaction[] {
    if (this.selectedTypeFilter === 'all'){
      return this.transactions;
    }

    return this.transactions
      .filter((transaction) => transaction.type === this.selectedTypeFilter);
  }


  getTotalIncome(): number {
    return this.transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses()
  }

  addTransaction(transaction: Transaction): void {
    this.transactions = [...this.transactions, transaction]
  }

  deleteTransaction(id: number): void {
    this.transactions = this.transactions
    .filter((transaction) => transaction.id !== id);
  }
}
