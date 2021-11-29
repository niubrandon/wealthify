import React, { useState, useEffect } from 'react';
import '../styles/components/stockHeader.scss';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const StockHeader = (props) => {
  const { name, regMP, authUser, account, setAuthUser } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
    } else {
      navigate('/401');
    }
  }, []);

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
          setAuthUser={setAuthUser}
        />
      )}
    </>
  );
};

export default StockHeader;
