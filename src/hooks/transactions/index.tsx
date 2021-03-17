import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import {
  CreateTransactionData,
  Transaction,
  TransactionsContextData,
  TransactionsProviderProps,
} from './types';

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  async function createTransaction(transactionInput: CreateTransactionData) {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { data: transaction } = response;

    setTransactions([transaction, ...transactions]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
