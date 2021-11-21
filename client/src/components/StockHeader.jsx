import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/components/stockHeader.scss';

// props
// name

const StockHeader = (props) => {
  const { name } = props;
  return (
    <header id='stock-header'>
      <h1>{name}</h1>
      <div className='buttons'>
        <button className='buy'>Buy</button>
        <button className='sell'>Sell</button>
      </div>
    </header>
  );
};

export default StockHeader;
