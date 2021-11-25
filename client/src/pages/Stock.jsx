import StockGraph from '../components/StockGraph';
import StockHeader from '../components/StockHeader';
import './Stock.scss';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import StockTable from '../components/StockTable';
import Button from 'react-bootstrap/Button';

const axios = require('axios').default;

const Stock = (props) => {
  const { authUser, account } = props;
  const [graphx, setGraphx] = useState([]);
  const [graphy, setGraphy] = useState([]);
  const [detail, setDetail] = useState([]);
  const [range, setRange] = useState('1d');
  const [interval, setInterval] = useState('15m');

  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const { name } = useParams();

  var options = {
    method: 'GET',
    url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${name}`,
    params: { range: range, interval: interval },
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log('graph called');

        setGraphx(response.data.chart.result[0].timestamp);
        range === '1d'
          ? setGraphy(response.data.chart.result[0].indicators.quote[0].close)
          : setGraphy(
              response.data.chart.result[0].indicators.adjclose[0].adjclose
            );
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [range]);

  const options2 = {
    method: 'GET',
    url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
    params: { symbols: name },
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  };

  useEffect(() => {
    axios
      .request(options2)
      .then(function (response) {
        setDetail(response.data.quoteResponse.result[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const daily = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('1d');
    setInterval('15m');
  };

  const weekly = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('5d');
    setInterval('1d');
  };

  const yearly = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('1y');
    setInterval('1mo');
  };

  return (
    <>
      <StockHeader
        name={name}
        regMP={detail.regularMarketPrice}
        authUser={authUser}
        account={account}
      />
      <button
        type='button'
        className='btn btn-outline-info'
        onClick={(e) => daily(e)}
      >
        Daily
      </button>
      <button
        type='button'
        className='btn btn-outline-info'
        onClick={(e) => weekly(e)}
      >
        Weekly
      </button>
      <button
        type='button'
        className='btn btn-outline-info'
        onClick={(e) => yearly(e)}
      >
        Yearly
      </button>
      <StockGraph
        range={range}
        xAxis={graphx}
        yAxis={graphy}
      />
      <StockTable
        regularMarketPrice={detail.regularMarketPrice}
        regularMarketChange={detail.regularMarketChange}
        regularMarketChangePercent={detail.regularMarketChangePercent}
        marketCap={detail.marketCap}
        regularMarketDayHigh={detail.regularMarketDayHigh}
        regularMarketDayLow={detail.regularMarketDayLow}
        regularMarketVolume={detail.regularMarketVolume}
        regularMarketPreviousClose={detail.regularMarketPreviousClose}
        exchangeTimezoneName={detail.exchangeTimezoneName}
        regularMarketOpen={detail.regularMarketOpen}
      />
    </>
  );
};

export default Stock;

// const detail = {
//   regularMarketPrice: 160.55,
//   regularMarketChange: 2.680008,
//   regularMarketChangePercent: 1.6976044,
//   marketCap: 2634047553536,
//   regularMarketDayHigh: 161.02,
//   regularMarketDayLow: 156.5328,
//   regularMarketVolume: 117305597,
//   regularMarketPreviousClose: 157.87,
//   exchangeTimezoneName: "America/New_York",
//   regularMarketOpen: 157.65,
// };

// regularMarketPrice: 160.55
// regularMarketChange: 2.680008
// regularMarketChangePercent: 1.6976044
// marketCap: 2634047553536
// regularMarketDayHigh: 161.02
// regularMarketDayLow: 156.5328
// regularMarketVolume: 117305597
// regularMarketPreviousClose: 157.87
// exchangeTimezoneName: "America/New_York"
// regularMarketOpen: 157.65

// Symbol, regularMarketPrice, regularMarketChange,
// regularMarketChangePercent, marketCap fmt, regularMarketDayHigh, regularMarketDayLow, regularMarketVolume fmt, regularMarketPreviousClose fmt,
// exchangeName, regularMarketOpen fmt, industry, sector, website, longBusinessSummary

// const options = {
//   method: 'GET',
//   url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
//   params: {symbols: 'AAPL'},
//   headers: {
//     'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
//     'x-rapidapi-key': 'rw9oV5YAcGmshkCGpJdkhwRAXbnAp1HofApjsntB8od230Yqct'
//   }
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
