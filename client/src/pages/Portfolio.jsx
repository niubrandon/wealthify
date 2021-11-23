import axios from 'axios';
import { useEffect } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import Transactions from '../components/Transactions';
import Referral from '../components/Referral';

const Portfolio = (props) => {
  console.log('printing from portfolio', props.authUser);

  useEffect(() => {
    /*   if (!account) {
      return
    } */
    const url = `http://localhost:3000/api/accounts/${props.authUser.user_id}`;
    const config = {
      headers: {
        Authorization: 'Bearer ' + props.authUser.jwt,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response.data);
        props.setAccount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    <section className='page'>
      <div style={flexWrapperVertical}>
        {props.account && <PortfolioDonutChart />}
        {props.account && <PortfolioCard account={props.account} />}
        {props.account && <Transactions account={props.account} />}
        <Referral account={props.account} />
      </div>
    </section>
  );
};

export default Portfolio;
