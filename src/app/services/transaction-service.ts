import { Service } from '@angular/core';
import { Transaction, TransactionFilterType, TransactionType, CategoryTotal } from '../models/transaction';

@Service()
export class TransactionService {
  private readonly storageKey = 'finance-tracker-transactions'

  private loadTransactions(): Transaction[] {
    const savedTransactions = localStorage.getItem(this.storageKey)

    if (!savedTransactions){
      return [
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
    }

    return JSON.parse(savedTransactions);
  }

  transactions: Transaction[] = this.loadTransactions();

  private saveTransactions(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.transactions)
    )
  }

  getFilteredTransactions(type: TransactionFilterType,
    category: string,
    month: string
  ): Transaction[] {
    return this.transactions.filter((transaction) => {
      const matchesType = 
      type === 'all' || transaction.type === type;

      const matchesCategory =
      category === 'all' || transaction.category === category;

      const mathcesMonth =
      month === 'all' || transaction.date.startsWith(month);

      return matchesType && matchesCategory && mathcesMonth
    });
  }

  getTotalForTransactions(transactions: Transaction[],
    type: TransactionType
  ): number {
    return transactions
      .filter((transaction) => transaction.type === type)
      .reduce((total, transactions) => total + transactions.amount, 0)
  }

  getExpenseTotalsByCategory(transactions: Transaction[]): CategoryTotal[] {
    const totalsByCategory: Record<string, number> = {};

    transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      const currentTotal = totalsByCategory[transaction.category] ?? 0;
      totalsByCategory[transaction.category] = currentTotal + transaction.amount;
    });

    return Object.entries(totalsByCategory).map(([category, total]) => ({
      category,
      total
    }));
  }

  addTransaction(transaction: Transaction): void {
  this.transactions = [...this.transactions, transaction];
  this.saveTransactions();
  }

  updateTransaction(updatedTransaction: Transaction): void {
    this.transactions = this.transactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    this.saveTransactions();
  }

  deleteTransaction(id: number): void {
  this.transactions = this.transactions.filter(
    (transaction) => transaction.id !== id
  );

  this.saveTransactions();
  } 

  getCategories(): string[] {
    return [...new Set(this.transactions.map((transaction) => transaction.category))];
  }

  getMonths(): string[] {
    return [...new Set(this.transactions.map((transaction) => transaction.date.slice(0, 7)))];
  }
}
