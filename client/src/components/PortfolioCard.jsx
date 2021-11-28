import { Link } from 'react-router-dom';
import '../styles/components/portfolioCard.scss'

const PortfolioCard = (props) => {
  const portfolioCards =
    props.account &&
    props.account.portfolio.map((item, index) => {
      return (
        <div key={index} className='portfolio-card'>
          <header>
            <Link to={props.authUser ? `/stock/${item.ticker}`: '/401'} className='link'>{item.ticker}</Link>
          </header>
          <footer>
            <p>{item.quantity} <span>shares</span></p>
            <p>{`$${Number(
              item.current_spot_price
            ).toFixed(2)} `}<span>/share</span></p>
            <p>{`${Number(
                ((item.quantity * item.current_spot_price) /
                  props.account.account.total_balance) *
                  100
              ).toFixed(2)}`}<span>% of portfolio</span></p>
            <Link to={props.authUser ? `/stock/${item.ticker}`: '/401'} className='trade'>Trade</Link>
          </footer>
        </div>
      );
    });
  return <>{props.account && portfolioCards}</>;
};

export default PortfolioCard;
