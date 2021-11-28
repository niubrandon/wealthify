import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const PortfolioCard = (props) => {
  const portfolioCards =
    props.account &&
    props.account.portfolio.map((item, index) => {
      return (
        
          <Card key={index} className='w-50 text-center'>
            <Card.Header as='h5' id='ticker'>
              {item.ticker}
            </Card.Header>
            <Card.Body>
              <Card.Title>quantity: {item.quantity}</Card.Title>
              <Card.Title>{`spot price: $${Number(
                item.current_spot_price
              ).toFixed(2)} USD`}</Card.Title>
              <Card.Text>
                {`Current market value is $${Number(
                  item.quantity * item.current_spot_price
                ).toFixed(2)} , representing  ${Number(
                  ((item.quantity * item.current_spot_price) /
                    props.account.account.total_balance) *
                    100
                ).toFixed(2)}% of your total portfolio`}
              </Card.Text>
              <Link className='trade' to={`/stock/${item.ticker}`}>
                Trade
              </Link>
            </Card.Body>
          </Card>
        
      );
    });
  return <>{props.account && portfolioCards}</>;
};

export default PortfolioCard;
