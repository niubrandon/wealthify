import axios from 'axios';
import { useEffect, useState } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import PortfolioBarChart from '../components/PortfolioBarChart';
import Transactions from '../components/Transactions';
import Referral from '../components/Referral';
import NoUser from '../pages/NoUser';
import { Navigate } from 'react-router-dom';
import '../styles/pages/portfolio.scss'

const Portfolio = (props) => {

  const [balanceData, setBalanceData] = useState("");

  console.log('Props:', props)
  useEffect(() => {
    if (!props.authUser) {
      <Navigate to='/401' />;
      return;
    }
    const config = {
      headers: {
        Authorization: 'Bearer ' + props.authUser.jwt,
      }
    }
    Promise.all([
    
      Promise.resolve(axios.get(`http://localhost:3000/api/accounts/${props.authUser.user_id}`,config)),
      Promise.resolve(axios.get(`http://localhost:3000/api/accounts/balances/${props.authUser.user_id}`, config))

    ]).then((all) => {
      const [first, second] = all;
      console.log("###all###", first.data, second.data)
      props.setAccount(first.data);
      setBalanceData(second.data);
    }).catch(err => console.log(err))


  }, [props.authUser]);

  return (
    <section id='portfolio' className='page'>
      <h1>Your Portfolio Balance is <span>{props.account && `$${Number(props.account.account.total_balance).toFixed(2)}`}</span></h1>
      <div>{balanceData && <PortfolioBarChart data={balanceData}/>}</div>
      <h2>Current Holdings</h2>
      <div className='holdings'>
          {!props.account && <p>you don't have any holdings</p>}
          <div className='cards'>{props.account && <PortfolioCard account={props.account} authUser={props.authUser}/>}</div>
          <div className='donut'>{props.account && <PortfolioDonutChart account={props.account} />}</div>
      </div>
      <h2>Transaction History</h2>
      <div className='table'>
        {props.account && <Transactions account={props.account} />}
      </div>
      <h2>Referral Code</h2>
      <div className='referral'>
        <Referral account={props.account} authUser={props.authUser} />
      </div>
    </section>
  );
};

export default Portfolio;
