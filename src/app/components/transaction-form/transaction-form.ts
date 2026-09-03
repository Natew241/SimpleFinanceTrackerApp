import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {Transaction, TransactionType} from '../../models/transaction';

@Component({
  imports: [FormsModule],
  selector: 'app-transaction-form',
  styleUrl: './transaction-form.css',
  templateUrl: './transaction-form.html',
})
export class TransactionForm implements OnChanges {

  @Input() transactionToEdit: Transaction | null = null;
  @Output() transactionAdded = new EventEmitter<Transaction>();
  @Output() transactionUpdated = new EventEmitter<Transaction>();
  @Output() editCanceled = new EventEmitter<void>();

  categories = [
    'Salary',
    'Food',
    'Utilities',
    'Transportation',
    'Entertainment',
    'Health',
    'Shopping',
    'Other',
  ]

  title = '';
  amount = 0;
  type: TransactionType = 'expense';
  category = 'Food';
  date = this.getToday();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionToEdit'] && this.transactionToEdit) {
      this.title = this.transactionToEdit.title;
      this.amount = this.transactionToEdit.amount;
      this.type = this.transactionToEdit.type;
      this.category = this.transactionToEdit.category;
      this.date = this.transactionToEdit.date;
    }
  }

  addTransaction(form: NgForm): void {
    const newTransaction: Transaction = {
      id: this.transactionToEdit?.id ?? Date.now(),
      title: this.title,
      amount: this.amount,
      type: this.type,
      category: this.category,
      date: this.date,
    };

    if (this.transactionToEdit) {
      this.transactionUpdated.emit(newTransaction);
    } else {
      this.transactionAdded.emit(newTransaction);
    }
    
    this.resetForm(form);
  }

  cancelEdit(form: NgForm): void {
    this.editCanceled.emit();
    this.resetForm(form);
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  private resetForm(form: NgForm): void {
    form.resetForm({
      title: '',
      amount: 0,
      type: 'expense',
      category: 'Food',
      date: this.getToday(),
    });
  }
}
