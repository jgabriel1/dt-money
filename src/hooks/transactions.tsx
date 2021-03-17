import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

type Transaction = {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  amount: number;
  createdAt: string;
};

type TransactionsProviderProps = {
  children: ReactNode;
};

const TransactionsContext = createContext<Transaction[]>([]);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
