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
    symbol: 'PWL',
    name: 'PowerLaw',
    exchDisp: 'ABC',
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

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  var options = {
    method: 'GET',
    // url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/autocomplete',
    params: { query: `${query}`, lang: 'en', region: 'US' },
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': '50021f6fa7msh7c5aa3a1b99700dp1fad37jsn02095460d420',
    },
  };

  // set the query to trigger the api call.
  useEffect(() => {
    setQuery('a');
  }, []);

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setResponse(response.data.ResultSet.Result);
        console.log(response.data.ResultSet.Result);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [query]);

  // replace stockData with response
  const searchResults = stockData.map((item, index) => {
    return (
      <Card
        key={index}
        name={item.name}
        symbol={item.symbol}
        exchDisp={item.exchDisp}
        regMP={12}
        regMCP={122}
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
