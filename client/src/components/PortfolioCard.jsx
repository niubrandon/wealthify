import { Link } from 'react-router-dom';
import '../styles/components/portfolioCard.scss'

const PortfolioCard = (props) => {
  const portfolioCards =
    props.account &&
    props.account.portfolio.map((item, index) => {
      return (
        <>
          <div key={index} className='.card'>
            <header>
              <Link to={props.authUser ? `/stock/${item.ticker}`: '/401'} className='link'>{item.ticker}</Link>
              <Link to={props.authUser ? `/stock/${item.ticker}`: '/401'} className='trade'>Trade</Link>
            </header>
            <footer>
              <p>{item.quantity} shares</p>
              <p>{`$${Number(
                item.current_spot_price
              ).toFixed(2)} `}<span>/share</span></p>
              <p>{`${Number(
                  ((item.quantity * item.current_spot_price) /
                    props.account.account.total_balance) *
                    100
                ).toFixed(2)}`}% of portfolio</p>
            </footer>
            {/* <div>
              <Card.Title>quantity: {item.quantity}</Card.Title>
              <Card.Title></Card.Title>
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
            </div> */}
          </div>
        </>
      );
    });
  return <>{props.account && portfolioCards}</>;
};

export default PortfolioCard;
