import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import '../styles/pages/home.scss';

const topData = [
  {
    quoteType: 'CRYPTOCURRENCY',
    symbol: 'ETH-USD',
    shortName: 'Ethereum USD',
    fullExchangeName: 'CCC',
    regularMarketPrice: 4410.3423,
    regularMarketChangePercent: 3.0420144,
    coinImageUrl: 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1027.png',
  },
  {
    quoteType: 'EQUITY',
    symbol: 'NEGG',
    shortName: 'Newegg Commerce, Inc.',
    fullExchangeName: 'NasdaqCM',
    regularMarketPrice: 17.38,
    regularMarketChangePercent: -3.0842142,
  },
  {
    quoteType: 'CRYPTOCURRENCY',
    symbol: 'ETH-USD',
    shortName: 'Ethereum USD',
    fullExchangeName: 'CCC',
    regularMarketPrice: 4410.3423,
    regularMarketChangePercent: 3.0420144,
    coinImageUrl: 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1027.png',
  },
  {
    quoteType: 'EQUITY',
    symbol: 'NEGG',
    shortName: 'Newegg Commerce, Inc.',
    fullExchangeName: 'NasdaqCM',
    regularMarketPrice: 17.38,
    regularMarketChangePercent: 3.0842142,
  },
  {
    quoteType: 'CRYPTOCURRENCY',
    symbol: 'ETH-USD',
    shortName: 'Ethereum USD',
    fullExchangeName: 'CCC',
    regularMarketPrice: 4410.3423,
    regularMarketChangePercent: 3.0420144,
    coinImageUrl: 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1027.png',
  },
  {
    quoteType: 'EQUITY',
    symbol: 'NEGG',
    shortName: 'Newegg Commerce, Inc.',
    fullExchangeName: 'NasdaqCM',
    regularMarketPrice: 17.38,
    regularMarketChangePercent: 3.0842142,
  },
  {
    quoteType: 'CRYPTOCURRENCY',
    symbol: 'ETH-USD',
    shortName: 'Ethereum USD',
    fullExchangeName: 'CCC',
    regularMarketPrice: 4410.3423,
    regularMarketChangePercent: 3.0420144,
    coinImageUrl: 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1027.png',
  },
  {
    quoteType: 'EQUITY',
    symbol: 'NEGG',
    shortName: 'Newegg Commerce, Inc.',
    fullExchangeName: 'NasdaqCM',
    regularMarketPrice: 17.38,
    regularMarketChangePercent: 3.0842142,
  },
  {
    quoteType: 'CRYPTOCURRENCY',
    symbol: 'ETH-USD',
    shortName: 'Ethereum USD',
    fullExchangeName: 'CCC',
    regularMarketPrice: 4410.3423,
    regularMarketChangePercent: 3.0420144,
    coinImageUrl: 'https://s.yimg.com/uc/fin/img/reports-thumbnails/1027.png',
  },
  {
    quoteType: 'EQUITY',
    symbol: 'NEGG',
    shortName: 'Newegg Commerce, Inc.',
    fullExchangeName: 'NasdaqCM',
    regularMarketPrice: 17.38,
    regularMarketChangePercent: 3.0842142,
  },
];

const Home = (props) => {
  const { authUser } = props;
  console.log(authUser);
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const API_HOST = `${process.env.REACT_APP_API_HOST}`;
  const API_TOPSTOCKS = `${process.env.REACT_APP_API_TOPSTOCKS}`;

  const [response, setResponse] = useState([]);

  var options = {
    method: 'GET',
    url: API_TOPSTOCKS,
    params: {
      symbols: 'ETH-USD,AMSC,DOT1-USD,BTC-USD,SHOP,TLRY,CGC,TWLO,NEGG,DKNG',
      lang: 'en',
      region: 'US',
    },
    headers: {
      'x-rapidapi-host': API_HOST,
      'x-rapidapi-key': API_KEY,
    },
  };

  useEffect(() => {
    if (authUser) {
      options['config'] = {
        headers: {
          Authorization: 'Bearer ' + authUser.jwt,
        },
      };
    }
    axios
      .request(options)
      .then((response) => {
        setResponse(response.data.quoteResponse.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (authUser) {
      options['config'] = {
        headers: {
          Authorization: 'Bearer ' + authUser.jwt,
        },
      };
    }
    const callTopStocks = setInterval(() => {
      axios
        .request(options)
        .then((response) => {
          setResponse(response.data.quoteResponse.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000);

    return () => clearInterval(callTopStocks);
  }, [response]);

  const topStocksResults = response.map((item, index) => {
    return (
      <Card
        key={index}
        name={item.name}
        symbol={item.symbol}
        exchDisp={item.fullExchangeName}
        regMP={item.regularMarketPrice}
        regMCP={item.regularMarketChangePercent}
        quoteType={item.quoteType}
        authUser={authUser}
      />
    );
  });
  return (
    <section id='home' className='page'>
      <h1 className='home-title'>
        Top 10 on <span>Wealthify</span>
      </h1>
      <p className='message'>Click to learn more</p>
      <div id='cards'>{topStocksResults}</div>
    </section>
  );
};

export default Home;
