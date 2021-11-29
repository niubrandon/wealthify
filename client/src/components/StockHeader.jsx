import React, { useState } from 'react';
import '../styles/components/stockHeader.scss';
import Modal from '../components/Modal';

const StockHeader = (props) => {
  const { name, regMP, authUser, account } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState('');

  const openModal = (e) => {
    setModal(e.target.innerHTML);
    setIsOpen(true);
  };

  return (
    <>
      <div id='stock-header'>
        <h1>{name}</h1>
        <div className='buttons'>
          <button className='buy' onClick={openModal}>
            Buy
          </button>
          <button className='sell' onClick={openModal}>
            Sell
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal
          modalType={modal}
          setIsOpen={setIsOpen}
          name={name}
          regMP={regMP}
          authUser={authUser}
          account={account}
        />
      )}
    </>
  );
};

export default StockHeader;
