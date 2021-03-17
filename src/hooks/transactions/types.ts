import { ReactNode } from 'react';

export type Transaction = {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
};

export type CreateTransactionData = Omit<Transaction, 'id' | 'createdAt'>;

export type TransactionsContextData = {
  transactions: Transaction[];
  createTransaction: (transaction: CreateTransactionData) => Promise<void>;
};

export type TransactionsProviderProps = {
  children: ReactNode;
};
