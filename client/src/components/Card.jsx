import '../styles/components/card.scss';
import { Link } from 'react-router-dom';
import React from 'react';


// props
// name, symbol, exchDisp, regMP, regMCP

const Card = (props) => {
  const { name, symbol, exchDisp, regMP, regMCP } = props;
  return (
    <Link to={`/stock/${symbol}`}>
      <div className='card-container'>
        <div className='card-name'>
          <h1>{symbol}</h1>
          <p>{name}</p>
          {exchDisp && <p>{exchDisp}</p>}
        </div>
        <div className='card-details'>
          {regMP && (
            <p>
              <span>$</span>
              {regMP}
            </p>
          )}
          {regMCP && <p>{regMCP}%</p>}
        </div>
      </div>
    </Link>
  );
};

export default Card;
