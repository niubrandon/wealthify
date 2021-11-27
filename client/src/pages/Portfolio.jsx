import axios from 'axios';
import { useEffect } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import Transactions from '../components/Transactions';
import Referral from '../components/Referral';
import NoUser from '../pages/NoUser';
import { Navigate } from 'react-router-dom';
import '../styles/pages/portfolio.scss'

const Portfolio = (props) => {
  console.log('Props:', props)
  useEffect(() => {
    if (!props.authUser) {
      <Navigate to='/401' />;
      return;
    }
    const url = `http://localhost:3000/api/accounts/${props.authUser.user_id}`;
    const config = {
      headers: {
        Authorization: 'Bearer ' + props.authUser.jwt,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        props.setAccount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.authUser]);

  return (
    <section id='portfolio' className='page'>
      <h1>Your Portfolio Balance is <span>{props.account && `$${Number(props.account.account.total_balance).toFixed(2)}`}</span></h1>
      <div>Bar Chart Will Go Here</div>
      <div className='holdings'>
          {!props.account && <p>you don't have any holdings</p>}
          <div className='card'>{props.account && <PortfolioCard account={props.account} authUser={props.authUser}/>}</div>
          <div className='donut'>{props.account && <PortfolioDonutChart account={props.account} />}</div>
      </div>
      <div >
        
        
        {props.account && <Transactions account={props.account} />}
        <Referral account={props.account} authUser={props.authUser} />
      </div>
    </section>
  );
};

export default Portfolio;
