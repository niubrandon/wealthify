import ReactDOM from 'react-dom';
import '../styles/components/modal.scss';
import { AiFillCloseCircle } from 'react-icons/ai';

// props
// needs the stock name
// modal type (buy or sell)
// setIsOpen

const Modal = (props) => {
  const { modalType, setIsOpen, name } = props;

  return ReactDOM.createPortal(
    <aside id='modal'>
      <div className='modal-container'>
        <button onClick={() => setIsOpen(false)}>
          <AiFillCloseCircle />
        </button>

        <h1>
          Modal {modalType} {name}
        </h1>

        <form action=''></form>
      </div>
    </aside>,
    document.getElementById('portal')
  );
};

export default Modal;
