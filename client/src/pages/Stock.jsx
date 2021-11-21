import StockGraph from '../components/StockGraph';
import StockHeader from '../components/StockHeader';
import './Stock.scss';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const axios = require('axios').default;

const Stock = (props) => {
  const [graphx, setGraphx] = useState([]);
  const [graphy, setGraphy] = useState([]);
  const [detail, setDetail] = useState([]);

  const { name } = useParams();

  var options = {
    method: 'GET',
    url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/${name}`,
    params: { range: '3mo', interval: '1d' },
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': 'rw9oV5YAcGmshkCGpJdkhwRAXbnAp1HofApjsntB8od230Yqct',
    },
  };

  // useEffect(() => {
  //   axios.request(options).then(function (response) {

  //     setGraphx(response.data.chart.result[0].timestamp)

  //     setGraphy(response.data.chart.result[0].indicators.adjclose[0].adjclose)

  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }, [])

  const options2 = {
    method: 'GET',
    url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
    params: { symbols: name },
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': 'rw9oV5YAcGmshkCGpJdkhwRAXbnAp1HofApjsntB8od230Yqct',
    },
  };

  // useEffect(() => {
  //   axios.request(options2).then(function (response) {
  //     setDetail(response.data.quoteResponse.result[0])
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }, [])

  return (
    <section className='page'>
      <StockHeader name={name} />
      <StockGraph xAxis={graphx} yAxis={graphy} />
      <span>Stats</span>
      <table class='table'>
        {/* <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Value</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <td>Market Price</td>
            <td>{detail.regularMarketPrice}</td>
          </tr>
          <tr>
            <td>Market Change</td>
            <td>{detail.regularMarketChange}</td>
          </tr>
          <tr>
            <td>Market Change Percent</td>
            <td>{detail.regularMarketChangePercent}</td>
          </tr>
          <tr>
            <td>MarketCap</td>
            <td>{detail.marketCap}</td>
          </tr>
          <tr>
            <td>Market Day High</td>
            <td>{detail.regularMarketDayHigh}</td>
          </tr>
          <tr>
            <td>Market Day Low</td>
            <td>{detail.regularMarketDayLow}</td>
          </tr>
          <tr>
            <td>Market Volume</td>
            <td>{detail.regularMarketVolume}</td>
          </tr>
          <tr>
            <td>Market Previous Close</td>
            <td>{detail.regularMarketPreviousClose}</td>
          </tr>
          <tr>
            <td>Exchange</td>
            <td>{detail.exchangeTimezoneName}</td>
          </tr>
          <tr>
            <td>Market Open</td>
            <td>{detail.regularMarketOpen}</td>
          </tr>
        </tbody>
      </table>
    </section>
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
