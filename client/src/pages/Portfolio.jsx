import axios from 'axios';
import { useEffect } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import PortfolioBarChart from '../components/PortfolioBarChart';
import Transactions from '../components/Transactions';
import Referral from '../components/Referral';
import NoUser from '../pages/NoUser';
import { Navigate } from 'react-router-dom';

const Portfolio = (props) => {
  console.log('acccount from portfolio:', props.account);
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      props.setAuthUser(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);

  useEffect(() => {
    if (!props.authUser) {
      <Navigate to='/401' />;
    }
  }, [props.userAuth]);

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
        // console.log(response.data);
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
    width: '60%',
    margin: 'auto',
  };

  return (
    <>
      {/* {!props.authUser ? (
        <Navigate to='/401' />
      ) : (
        <section className='page'>
          <div style={flexWrapperVertical}>
            {!props.account && <p>you don't have any holdings</p>}
            {props.account && <PortfolioBarChart account={props.account} />}
            {props.account && <PortfolioDonutChart account={props.account} />}
            {props.account && <PortfolioCard account={props.account} />}
            {props.account && <Transactions account={props.account} />}
            <Referral account={props.account} authUser={props.authUser} />
          </div>
        </section>
      )}
      ) : ( */}
      <section className='page'>
        <div style={flexWrapperVertical}>
          {!props.account && <p>you don't have any holdings</p>}
          {props.account && <PortfolioDonutChart account={props.account} />}
          {props.account && <PortfolioCard account={props.account} />}
          {props.account && <Transactions account={props.account} />}
          <Referral account={props.account} authUser={props.authUser} />
        </div>
      </section>
      {/* )} */}
    </>
  );
};

export default Portfolio;
