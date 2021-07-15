import Modal from 'react-modal';
import { Container, NewTransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';

import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){

    const { createNewTransaction } = useTransactions();

    const[title, setTitle] = useState('')
    const[amount, setAmount] = useState(0)
    const[category, setCategory] = useState('')

    const [type,setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

      await createNewTransaction({
          title, 
          amount,
          category, 
          type,

      })
      setTitle('');
      setAmount(0);
      setCategory('');
      setType('deposit');

      onRequestClose();
    }

    return(
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content" 
        >
        
            <button 
            type="button" 
            onClick={onRequestClose}
            className="react-modal-close"
            
            >
                <img src={closeImg}  alt="Fechar" />
            </button>
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Trasação</h2>

            <input
                placeholder="Título"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <input 
                type="number"
                placeholder="valor"
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
            />

            <NewTransactionTypeContainer>
                <RadioBox
                    type="button"
                    onClick={() => setType('deposit')}
                    isActive= {type === 'deposit'}
                    activeColor="green"
                >
                    <img src={incomeImg} alt="Entrada"/>
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox
                    type="button"
                    onClick={() => setType('withdraw')}
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >
                    <img src={outcomeImg} alt="Saída"/>
                    <span>Saída</span>
                </RadioBox>
            </NewTransactionTypeContainer>

            <input  
                placeholder="Categoria"
                value={category}
                onChange={event => setCategory(event.target.value)}
            />

            <button type="submit" >
                Salvar
            </button>
            
        </Container>
         
      </Modal>
    );
}