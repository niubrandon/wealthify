import axios from 'axios';
import { useEffect, useState } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import PortfolioBarChart from '../components/PortfolioBarChart';
import Transactions from '../components/Transactions';
import Referral from '../components/Referral';
import NoUser from '../pages/NoUser';
import { Navigate } from 'react-router-dom';

const Portfolio = (props) => {
  console.log('print authUser from portfolio', props.authUser);
  console.log('print account from portfolio', props.account);
  const [balanceData, setBalanceData] = useState("");

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

  const flexWrapperVertical = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '60%',
    margin: 'auto',
  };

  return (
    <>
      <section className='page'>
        <div style={flexWrapperVertical}>
          {!props.account && <p>you don't have any holdings</p>}
          {balanceData && <PortfolioBarChart data={balanceData}/>}
          {props.account && <PortfolioDonutChart account={props.account} />}
          {props.account && <PortfolioCard account={props.account} />}
          {props.account && <Transactions account={props.account} />}
          <Referral account={props.account} authUser={props.authUser} />
        </div>
      </section>
    </>
  );
};

export default Portfolio;
