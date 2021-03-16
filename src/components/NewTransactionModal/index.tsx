import { useState, FormEvent } from 'react';
import Modal from 'react-modal';

import { api } from '../../services/api';

import { Container, TransactionTypeButton, TransactionTypeContainer } from './styles';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

type TransactionType = 'deposit' | 'withdraw';

type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    await api.post('transactions', data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt="X" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder='Título'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder='Valor'
          type='number'
          value={value}
          onChange={e => setValue(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <TransactionTypeButton
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeImg} alt='Entrada' />

            <span>Entrada</span>
          </TransactionTypeButton>

          <TransactionTypeButton
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeImg} alt='Saída' />

            <span>Saída</span>
          </TransactionTypeButton>
        </TransactionTypeContainer>

        <input
          placeholder='Categoria'
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button type='submit'>Cadastrar</button>
      </Container>
    </Modal>
  );
}
