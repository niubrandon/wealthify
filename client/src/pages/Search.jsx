import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import '../styles/pages/search.scss';

const Search = (props) => {
  const { authUser } = props;
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;
  const API_HOST = `${process.env.REACT_APP_API_HOST}`;
  const API_AUTOCOMPLETE = `${process.env.REACT_APP_API_AUTOCOMPLETE}`;

  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const options = {
    method: 'GET',
    url: API_AUTOCOMPLETE,
    params: { query: `${query}`, lang: 'en', region: 'US' },
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
        authUser={authUser}
      />
    );
  });

  return (
    <section id='search' className='page'>
      <form>
        <input
          id='search-bar'
          placeholder='Begin typing to search...'
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
