import { useTransactions } from '../../hooks/transactions';

import { Container } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useMemo } from 'react';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = useMemo(() => {
    const summaryValues = transactions.reduce(
      (acc, transaction) => {
        switch (transaction.type) {
          case 'deposit':
            acc.deposits += transaction.amount;
            break;
          case 'withdraw':
            acc.withdrawals += transaction.amount;
            break;
        }

        return acc;
      },
      { deposits: 0, withdrawals: 0 }
    );

    const formatValue = (value: number) =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);

    return {
      deposits: formatValue(summaryValues.deposits),
      withdrawals: formatValue(summaryValues.withdrawals),
      total: formatValue(summaryValues.deposits - summaryValues.withdrawals),
    };
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>

          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>{summary.deposits}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>

          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>- {summary.withdrawals}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>

          <img src={totalImg} alt="Total" />
        </header>

        <strong>{summary.total}</strong>
      </div>
    </Container>
  );
}
