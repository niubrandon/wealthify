import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from '../components/Modal';

const PortfolioCard = (props) => {
  const { account, authUser } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const generateModal = (e) => {
    setName(e.currentTarget.getAttribute('ticker'));
    setPrice(e.currentTarget.getAttribute('price'));
    setModal(e.target.innerHTML);
    setIsOpen(true);
  };

  const portfolioCards =
    props.account &&
    props.account.portfolio.map((item, index) => {
      return (
        <>
          <Card key={index} className='w-50 text-center'>
            <Card.Header as='h5' id='ticker'>
              {item.ticker}
            </Card.Header>
            <Card.Body>
              <Card.Title>quantity: {item.quantity}</Card.Title>
              <Card.Title>{`spot price: $${item.current_spot_price} USD`}</Card.Title>
              <Card.Text>
                {`Current market value is $${
                  item.quantity * item.current_spot_price
                } , representing  ${Number(
                  ((item.quantity * item.current_spot_price) /
                    props.account.account.total_balance) *
                    100
                ).toFixed(2)}% of your total portfolio`}
              </Card.Text>
              <Button
                variant='primary'
                onClick={generateModal}
                ticker={item.ticker}
                price={item.current_spot_price}
              >
                Buy
              </Button>
              <Button
                style={{ marginLeft: '2em' }}
                variant='danger'
                onClick={generateModal}
                ticker={item.ticker}
                price={item.current_spot_price}
              >
                Sell
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    });
  return (
    <>
      {props.account && portfolioCards}
      {isOpen && (
        <Modal
          modalType={modal}
          setIsOpen={setIsOpen}
          name={name}
          regMP={price}
          authUser={authUser}
          account={account}
        />
      )}
    </>
  );
};

export default PortfolioCard;
