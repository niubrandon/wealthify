import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import '../styles/pages/search.scss';

const stockData = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    exchDisp: 'TSX',
  },
  {
    symbol: 'AMZ',
    name: 'Amazon',
    exchDisp: 'NASDQ',
  },
  {
    symbol: 'AMC',
    name: 'AMC Entertainment Holdings, Inc.',
    exchDisp: 'NYSE',
  },
  {
    symbol: 'JK',
    name: 'Just Kidding',
    exchDisp: 'TMI',
  },
  {
    symbol: 'LOL',
    name: 'laugh Out Loud',
    exchDisp: 'HAH',
  },
  {
    symbol: 'AWW',
    name: 'Cute Stuff',
  },
  {
    symbol: 'AAPL',
    name: 'Apple',
    exchDisp: 'TSX',
  },
  {
    symbol: 'AMZ',
    name: 'Amazon',
    exchDisp: 'NSDQ',
  },

  {
    symbol: 'JK',
    name: 'Just Kidding',
    exchDisp: 'TMI',
  },
  {
    symbol: 'LOL',
    name: 'laugh Out Loud',
    exchDisp: 'HAH',
  },
];

const Search = () => {
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const API_HOST = `${process.env.REACT_APP_API_HOST}`;
  const API_AUTOCOMPLETE = `${process.env.REACT_APP_API_AUTOCOMPLETE}`;

  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  var options = {
    method: 'GET',
    url: API_AUTOCOMPLETE,
    params: { query: `${query}`, lang: 'en', region: 'US' },
    headers: {
      'x-rapidapi-host': API_HOST,
      'x-rapidapi-key': API_KEY,
    },
  };

  // set the query to trigger the api call.
  useEffect(() => {
    setQuery('a');
  }, []);

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setResponse(response.data.ResultSet.Result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  const searchResults = response.map((item, index) => {
    return (
      <Card
        key={index}
        name={item.name}
        symbol={item.symbol}
        exchDisp={item.exchDisp}
        regMP={null}
        regMCP={null}
        quoteType={null}
      />
    );
  });

  return (
    <section id='search' className='page'>
      <form>
        <input
          id='search-bar'
          placeholder='begin typing to search...'
          type='search'
          onChange={handleInput}
          autoFocus
          required
        />
      </form>
      <div id='cards'>{searchResults}</div>
    </section>
  );
};

export default Search;
