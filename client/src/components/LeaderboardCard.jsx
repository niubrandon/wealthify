import React from 'react';
import LeaderboardDonutChart from './LeaderboardDonutChart';
import { useState } from 'react';
import '../styles/components/leaderboardCard.scss'
import {FaTrophy} from 'react-icons/fa';
import {GrDown} from 'react-icons/gr'

const LeaderboardCard = (props) => {
  const { data } = props;
  const [donut, setDonut] = useState();

  const leaderboardCards = data.map((account, index) => {
    const onClick = () =>
      donut === account.account_id
        ? setDonut(null)
        : setDonut(account.account_id);
    const rank = index + 1;

    return (
      <article key={index} id='leaderboard-card'>
        <div className='user-info'>
          <h2 className='rank'>{rank}</h2> 
          <h2 className='email'>{account.email}</h2>
          <FaTrophy className='icon'/>
        </div>
        <div className='card-body'>
          <h2><strong>{`$${Number(account.total_balance).toFixed(
            2
          )}`}</strong></h2>
          <p>
            {/* {`Current market value is ${item.quantity * item.current_spot_price} , representing  ${Number(item.quantity * item.current_spot_price / props.account.account.total_balance * 100).toFixed(2)}% of your total portfolio`} */}
          </p>
          <button className='summary-btn' onClick={onClick}> 
            <p>View Summary</p>
            <GrDown className='down'/>
          </button>
        </div>
        {donut === account.account_id ? (
          <LeaderboardDonutChart
            stock_list={account.stock_list}
            market_value={account.market_value}
          />
        ) : null}
      </article>
    );
  });
  return <>{leaderboardCards}</>;
};

export default LeaderboardCard;
