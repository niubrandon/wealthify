import axios from 'axios';
import { useEffect, useState } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import PortfolioBarChart from '../components/PortfolioBarChart';
import Transactions from '../components/Transactions';
import Referral from '../components/Referral';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/portfolio.scss'

const Portfolio = (props) => {
  const {authUser, setAuthUser, account, setAccount} = props;

  const [balanceData, setBalanceData] = useState("");
  let navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
    } else {
      navigate('/401');
    }
    
  }, [navigate, setAuthUser]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + authUser.jwt,
      }
    }
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:3000/api/accounts/${authUser.user_id}`,config)),
      Promise.resolve(axios.get(`http://localhost:3000/api/accounts/balances/${authUser.user_id}`, config))

    ]).then((all) => {
      const [first, second] = all;
      setAccount(first.data);
      setBalanceData(second.data);
    }).catch(err => console.log(err))

  }, [authUser, setAccount]);

  return (
    <section id='portfolio' className='page'>
      <h1>Your Portfolio Balance is <span>{account && `$${Number(account.account.total_balance).toFixed(2)}`}</span></h1>
      <div className='portfoliobarchart'>{balanceData && <PortfolioBarChart data={balanceData}/>}</div>
      <h2>Current Holdings</h2>
      <div className='holdings'>
          {!account && <p>you don't have any holdings</p>}
          <div className='cards'>{account && <PortfolioCard account={account} authUser={authUser}/>}</div>
          <div className='donut'>{account && <PortfolioDonutChart account={account} />}</div>
      </div>
      <h2>Transaction History</h2>
      <div className='table'>
        {account && <Transactions account={account} />}
      </div>
      <h2>Referral Code</h2>
      <div className='referral'>
        <Referral account={account} authUser={authUser} />
      </div>
    </section>
  );
};

export default Portfolio;
