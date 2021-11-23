import axios from 'axios';
import { useEffect } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import Transactions from '../components/Transactions';

const Portfolio = (props) => {
  console.log('printing from portfolio', props.authUser);
  console.log('print from portfolio for account', props.account);

  useEffect(() => {
    if (!props.authUser) {
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
        console.log(response.data);
        props.setAccount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.authUser]);

  const flexWrapperVertical = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <>
      <div style={flexWrapperVertical}>
        {!props.account && <p>you don't have any holdings</p>}
        {props.account && <PortfolioDonutChart />}
        {props.account && <PortfolioCard account={props.account} />}
        {props.account && <Transactions account={props.account} />}
      </div>
    </>
  );
};

export default Portfolio;
