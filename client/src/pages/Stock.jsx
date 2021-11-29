import StockGraph from '../components/StockGraph';
import StockHeader from '../components/StockHeader';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import StockTable from '../components/StockTable';
import '../styles/pages/stock.scss';
import './Stock.scss';
import {GoEye, GoEyeClosed} from 'react-icons/go'

const axios = require('axios').default;

const Stock = (props) => {
  const { authUser, account, setAuthUser } = props;
  console.log('authUser on Stock:', authUser);
  const [graphx, setGraphx] = useState([]);
  const [graphy, setGraphy] = useState([]);
  const [detail, setDetail] = useState([]);
  const [range, setRange] = useState('1d');
  const [frequency, setfrequency] = useState('15m');
  const [favourite, setFavourite] = useState();
  const [activeButton, setActiveButton] = useState('');

  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const API_HOST = `${process.env.REACT_APP_API_HOST}`;
  const { name } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      navigate('/401');
      return
    }
  }, [authUser]);

  var options = {
    method: 'GET',
    url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${name}`,
    params: { range: range, interval: frequency },
    headers: {
      'x-rapidapi-host': API_HOST,
      // 'x-rapidapi-key': API_KEY,
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
      'x-rapidapi-host': API_HOST,
      // 'x-rapidapi-key': API_KEY,
    },
  };

  useEffect(() => {
    axios
      .request(options2)
      .then(function (response) {
        console.log(response.data)
        setDetail(response.data.quoteResponse.result[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/watchlists',
      data: favourite,
    })
      .then(function (response) {
        console.log(response.data);
        setDetail(response.data.quoteResponse.result[0]);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [favourite])

  const onFavourite = (e) => {
    e.preventDefault();
    activeButton === '' ? setActiveButton(' active') : setActiveButton('')
    setFavourite({watchlist: {ticker: name, user_id: authUser.user_id}})
  }

  const daily = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('1d');
    setfrequency('15m');
  };

  const weekly = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('5d');
    setfrequency('1d');
  };

  const yearly = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('1y');
    setfrequency('1mo');
  };

  return (
    <section id='stock' className='page'>
      <header>
       {authUser && 
          <button onClick={onFavourite}>
            {activeButton ? <GoEyeClosed className='watching'/> : <GoEye className='not-watching'/>}
          </button>
        }
        <StockHeader
          name={name}
          regMP={detail.regularMarketPrice}
          authUser={authUser}
          account={account}
        />
      </header>
      <StockGraph range={range} xAxis={graphx} yAxis={graphy} />
      <div className='buttons'>
        <button className='time-frequency'
          onClick={(e) => daily(e)}
        >
          Daily
        </button>
        <button className='time-frequency'
          onClick={(e) => weekly(e)}
        >
          Weekly
        </button>
        <button className='time-frequency'
          onClick={(e) => yearly(e)}
        >
          Yearly
        </button>
      </div>
      <StockTable
        regularMarketPrice={detail.regularMarketPrice}
        regularMarketChange={detail.regularMarketChange}
        regularMarketChangePercent={detail.regularMarketChangePercent}
        marketCap={detail.marketCap}
        regularMarketDayHigh={detail.regularMarketDayHigh}
        regularMarketDayLow={detail.regularMarketDayLow}
        regularMarketVolume={detail.regularMarketVolume}
        regularMarketPreviousClose={detail.regularMarketPreviousClose}
        exchange={detail.fullExchangeName}
        regularMarketOpen={detail.regularMarketOpen}
      />
    </section>
  )
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


//setFavourite({watchlist: {ticker: name, user_id: authUser.user_id}})