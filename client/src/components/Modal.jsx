import ReactDOM from 'react-dom';
import axios from 'axios';
import '../styles/components/modal.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsCalendar4Week } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import {
  currentTime,
  calculatePrice,
} from '../helpers/transactionCalculations.js';

// props
// needs the stock name
// modal type (buy or sell)
// setIsOpen

const Modal = (props) => {
  const { modalType, setIsOpen, name, regMP } = props;

  const [quantity, setQuantity] = useState(1);
  const [time, setTime] = useState(null);
  const [totalPrice, setTotalPrice] = useState(regMP);

  // Post request
  const [transaction, setTransaction] = useState({ transaction: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTransaction({
      transaction: {
        ticker: name,
        trade: 1, // -1 for sell, 1 for buy
        quantity: quantity,
        settled_price: totalPrice,
        account_id: null,
      },
    });
  };

  useEffect(() => {
    setTime(currentTime);

    const callTime = setInterval(() => {
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(callTime);
  }, [time]);

  useEffect(() => {
    setTotalPrice(calculatePrice(regMP, quantity));
  }, [quantity]);

  return ReactDOM.createPortal(
    <aside id='modal'>
      <div className='modal-container'>
        <button className='close' onClick={() => setIsOpen(false)}>
          <AiFillCloseCircle />
        </button>

        <h1>
          {modalType} {name}
        </h1>

        <form className='transaction-details'>
          <p>{name}</p>
          <div className='time'>
            <BsCalendar4Week />
            <p>{time}</p>
          </div>
          <div className='price'>
            <p>{regMP}</p>
            <p>/ share</p>
          </div>
          <input
            type='number'
            step='0.1'
            min='0'
            value={quantity}
            id='price'
            name='price'
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
          <div className='total'>
            <p>Total</p>
            <p>
              <span>$</span>
              {totalPrice}
            </p>
          </div>
          <input
            type='submit'
            name='submit'
            value={modalType}
            onClick={(e) => handleSubmit(e)}
          />
        </form>
      </div>
    </aside>,
    document.getElementById('portal')
  );
};

export default Modal;
