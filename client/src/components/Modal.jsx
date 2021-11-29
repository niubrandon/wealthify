import ReactDOM from 'react-dom';
import axios from 'axios';
import '../styles/components/modal.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsCalendar4Week } from 'react-icons/bs';
import { GoCheck } from 'react-icons/go';
import { MdOutlineClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  currentTime,
  calculatePrice,
} from '../helpers/transactionCalculations.js';

const Modal = (props) => {
  const { modalType, setIsOpen, name, regMP, authUser, setAuthUser } = props;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(regMP);
  const [responseStatus, setResponseStatus] = useState(null);
  const [transaction, setTransaction] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
    } else {
      navigate('/401');
    }
  }, []);

  const time = currentTime();

  const handleSubmit = (e) => {
    e.preventDefault();

    let trade = modalType === 'Buy' ? 1 : -1;

    setTransaction({
      transaction: {
        ticker: name,
        trade: trade,
        quantity: Number(quantity),
        settled_price: Number(regMP),
        // account_id: account.account.id,
        account_id: authUser.user_id,
      },
    });
  };

  useEffect(() => {
    if (!transaction) {
      return;
    }

    if (!authUser) {
      return;
    }

    axios({
      method: 'post',
      url: 'http://localhost:3000/api/transactions',
      data: transaction,
      config: {
        headers: {
          Authorization: 'Bearer ' + authUser.jwt,
        },
      },
    })
      .then((response) => {
        if (response.status < 300 && response.status > 199) {
          setResponseStatus('complete');
        }
      })
      .catch((error) => {
        console.log(error);
        setResponseStatus('error');
      });
  }, [transaction, authUser]);

  useEffect(() => {
    setTotalPrice(calculatePrice(regMP, quantity));
  }, [quantity, regMP]);

  return ReactDOM.createPortal(
    <aside id='modal'>
      <div className='modal-container'>
        <button className='close' onClick={() => setIsOpen(false)}>
          <AiFillCloseCircle />
        </button>

        <div className='modal-title'>
          <h1>{modalType}</h1>
          <h1>{name}</h1>
        </div>

        {transaction ? (
          <div className='transaction-msg'>
            {responseStatus === 'complete' && (
              <div className='msg'>
                <h2 className='complete'>
                  <GoCheck className='check' />
                  Transaction complete
                </h2>
                <p className='summary'>
                  You just {modalType === 'Buy' ? 'bought' : 'sold'} {quantity}{' '}
                  {quantity === 1 ? 'share' : 'shares'} of {name}.
                </p>
              </div>
            )}
            {responseStatus === 'error' && (
              <div className='msg'>
                <h2 className='complete'>
                  <MdOutlineClose className='bad' />
                  Transaction failed
                </h2>
                <p className='summary'>Please try again.</p>
              </div>
            )}
          </div>
        ) : (
          <form className='transaction-details'>
            <div className='time'>
              <BsCalendar4Week className='icon' />
              <p>{time}</p>
            </div>
            <p className='price'>
              <span> $</span> {regMP} <span className='label'> /share</span>
            </p>
            <div className='quantity'>
              <p>Qty:</p>
              <input
                type='number'
                step='0.1'
                min='0'
                value={quantity}
                className='price-select'
                autoFocus
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
            </div>

            <div className='total'>
              <p>Total</p>
              <p className='total-price'>
                <span>$</span>
                {totalPrice}
              </p>
            </div>
            <div className='quantity'></div>
            <input
              type='submit'
              className='submit'
              value={modalType}
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        )}
      </div>
    </aside>,
    document.getElementById('portal')
  );
};

export default Modal;
