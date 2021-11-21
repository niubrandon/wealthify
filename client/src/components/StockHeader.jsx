import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/stockHeader.scss';
import Modal from '../components/Modal';

// props
// name

const StockHeader = (props) => {
  const { name } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState('');

  const openModal = (e) => {
    setModal(e.target.className);
    setIsOpen(true);
  };

  return (
    <>
      <header id='stock-header'>
        <h1>{name}</h1>
        <div className='buttons'>
          <button className='buy' onClick={openModal}>
            Buy
          </button>
          <button className='sell' onClick={openModal}>
            Sell
          </button>
        </div>
      </header>
      {isOpen && <Modal modalType={modal} setIsOpen={setIsOpen} name={name} />}
    </>
  );
};

export default StockHeader;
