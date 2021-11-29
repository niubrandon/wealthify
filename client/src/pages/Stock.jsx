import StockGraph from '../components/StockGraph';
import StockHeader from '../components/StockHeader';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import StockTable from '../components/StockTable';
import '../styles/pages/stock.scss';
import {GoEye, GoEyeClosed} from 'react-icons/go'

const axios = require('axios').default;

const Stock = (props) => {
  const { authUser, account, setAuthUser } = props;
  console.log('authUser on Stock:', authUser);
  const [graphx, setGraphx] = useState([]);
  const [graphy, setGraphy] = useState([]);
  const [detail, setDetail] = useState([]);
  const [range, setRange] = useState('1d');
  const [graphInterval, setGraphInterval] = useState('15m');
  const [favourite, setFavourite] = useState('');
  const [activeButton, setActiveButton] = useState('');

  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const API_HOST = `${process.env.REACT_APP_API_HOST}`;
  const { name } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
    } else {
      navigate('/401');
    }
  }, []);

  useEffect(() => {
    if (!authUser) {
    //  <Navigate to='/401' />;
      return;
    }
    // get request for graph data
    let options = {
      method: 'GET',
      url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${name}`,
      params: { range: range, interval: graphInterval },
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY
      
      },
    };
  
      // get request for table data
      let options2 = {
        method: 'GET',
        url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
        params: { symbols: name },
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY
          
        },
      };

    Promise.all([

      Promise.resolve(axios.request(options)),
      Promise.resolve(axios.request(options2))
    ]).then((all) => {
      const [first, second] = all;
      console.log("printing data for promise all in stock page", all)
      //set graph
      setGraphx(first.data.chart.result[0].timestamp);
      range === '1d'
        ? setGraphy(first.data.chart.result[0].indicators.quote[0].close)
        : setGraphy(
            first.data.chart.result[0].indicators.adjclose[0].adjclose
          );
      //set table
      setDetail(second.data.quoteResponse.result[0]);

    }).catch(err => console.log(err))


  }, [authUser, range]);


  // add stock to watchlist
  useEffect(() => {
    if (!authUser) {
      return
    }

    if (!favourite) {
      return
    }

    const config = {
      headers: {
        Authorization: 'Bearer ' + authUser.jwt,
      }
    }

    axios({
      method: 'post',
      url: 'http://localhost:3000/api/watchlists',
      config,
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
    setGraphInterval('15m');
  };

  const weekly = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('5d');
    setGraphInterval('1d');
  };

  const yearly = (e) => {
    console.log('onClick invoked');
    e.preventDefault();

    setRange('1y');
    setGraphInterval('1mo');
  };

  return (
    <section id='stock' className='page'>
      <header>
       {authUser && 
          <button onClick={onFavourite}>
            {activeButton ? <GoEyeClosed className='watching'/> : <GoEye className='not-watching'/>}
          </button>
        }
      { detail &&  <StockHeader
          name={name}
          regMP={detail.regularMarketPrice}
          authUser={authUser}
          account={account}
        />}
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
      { detail && <StockTable
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
      />}
    </section>
  )
};

export default Stock;
