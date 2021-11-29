import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import '../styles/pages/home.scss';

const Home = (props) => {
  const { authUser } = props;
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const API_HOST = `${process.env.REACT_APP_API_HOST}`;
  const API_TOPSTOCKS = `${process.env.REACT_APP_API_TOPSTOCKS}`;

  const [response, setResponse] = useState([]);

  const options = {
    method: 'GET',
    url: API_TOPSTOCKS,
    params: {
      symbols: 'AAPL,ETH-USD,SHOP,AMSC,DOT1-USD,BTC-USD,MSFT,AMC,TLRY,CGC',
      lang: 'en',
      region: 'US',
    },
    headers: {
      'x-rapidapi-host': API_HOST,
      'x-rapidapi-key': API_KEY,
    },
  };

  if (authUser) {
    options['config'] = {
      headers: {
        Authorization: 'Bearer ' + authUser.jwt,
      },
    };
  }

  useEffect(() => {
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
    }, 15000);

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
