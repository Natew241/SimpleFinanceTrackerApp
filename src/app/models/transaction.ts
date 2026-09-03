export type TransactionType = 'income' | 'expense';
export type TransactionFilterType = 'all' | 'income' | 'expense';

export interface CategoryTotal {
    category: string;
    total: number;
}

export interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
}
