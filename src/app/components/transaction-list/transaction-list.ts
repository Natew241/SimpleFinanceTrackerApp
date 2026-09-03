import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction } from '../../models/transaction';

@Component({
  imports: [CurrencyPipe, DatePipe],
  selector: 'app-transaction-list',
  styleUrl: './transaction-list.css',
  templateUrl: './transaction-list.html',
})
export class TransactionList {
  @Input() transactions: Transaction[] = [];

  @Output() transactionDeleted = new EventEmitter<number>();

  deleteTransaction(id: number): void {
    this.transactionDeleted.emit(id)
  }
}
