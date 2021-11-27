import axios from 'axios';
import { useEffect } from 'react';
import PortfolioDonutChart from '../components/PortfolioDonutChart';
import PortfolioCard from '../components/PortfolioCard';
import Transactions from '../components/Transactions';
import Referral from '../components/Referral';
import NoUser from '../pages/NoUser';
import { useNavigate } from 'react-router-dom';

const Portfolio = (props) => {
  console.log('print account from portfolio', props.account);

  let navigate = useNavigate();

  // useEffect(() => {
  //   console.log('what is in localstorage????????:', localStorage)
  //   if (localStorage.getItem('auth')) {
  //     props.setAuthUser(JSON.parse(localStorage.getItem('auth')));
  //   }
  // }, []);


  useEffect(() => {
    // if (!localStorage.getItem('auth')) {
    //   navigate('/401');
    //   return
    // }
    console.log('print authUser from portfolio', props.authUser);

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
        {!props.account && <p>you don't have any holdings</p>}
        {props.account && <PortfolioDonutChart account={props.account} />}
        {props.account && <PortfolioCard account={props.account} />}
        {props.account && <Transactions account={props.account} />}
        <Referral account={props.account} authUser={props.authUser} />
      </div>
    </section>
  );
};

export default Portfolio;
