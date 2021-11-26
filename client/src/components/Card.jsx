import '../styles/components/card.scss';
import { Link } from 'react-router-dom';
import React from 'react';

// props
// name, symbol, exchDisp, regMP, regMCP

const Card = (props) => {
  const { name, symbol, exchDisp, regMP, regMCP, quoteType, authUser } = props;

  const regMPRound = regMP && regMP.toFixed(2);
  const regMCPRound = regMCP && regMCP.toFixed(2);

  return (
    <Link to={authUser ? `/stock/${symbol}` : '/401'} className='card-link'>
      <div className='card-container'>
        <div className='card-name'>
          <div className='text'>
            <h1>{symbol}</h1>
            <p>{name}</p>
            {exchDisp && <p>{exchDisp}</p>}
          </div>
          {quoteType === 'CRYPTOCURRENCY' && (
            <img
              src={`https://styles.redditmedia.com/t5_2wlj3/styles/communityIcon_7jxh2j4ouky41.png`}
              alt='cryptocurrency symbol'
            ></img>
          )}
        </div>
        <div className='card-details'>
          {regMP && (
            <p>
              <span> $</span>
              {regMPRound} <span className='label'>/ share</span>
            </p>
          )}
          {regMCP && (
            <p>
              <span className={regMCP >= 0 ? 'green' : 'red'}>
                {regMCPRound}%
              </span>{' '}
              <span className='label'>change</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
