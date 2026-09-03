import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {Transaction, TransactionType} from '../../models/transaction';

@Component({
  imports: [FormsModule],
  selector: 'app-transaction-form',
  styleUrl: './transaction-form.css',
  templateUrl: './transaction-form.html',
})
export class TransactionForm {

  @Output() transactionAdded = new EventEmitter<Transaction>();

  title = '';
  amount = 0;
  type: TransactionType = 'expense';
  category = '';
  date = '';

  addTransaction(form: NgForm): void {
    const newTransaction: Transaction = {
      id: Date.now(),
      title: this.title,
      amount: this.amount,
      type: this.type,
      category: this.category,
      date: this.date,
    };

    this.transactionAdded.emit(newTransaction);
    
    form.resetForm({
      title: '',
      amount: 0,
      type: 'expense',
      category: '',
      date: '',
    });
  }
}
