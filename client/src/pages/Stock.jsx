import StockGraph from "../components/StockGraph";
import "./Stock.scss"

const axios = require("axios").default;
const appleStockData = {
  regularMarketPrice: 160.55,
  regularMarketChange: 2.680008,
  regularMarketChangePercent: 1.6976044,
  marketCap: 2634047553536,
  regularMarketDayHigh: 161.02,
  regularMarketDayLow: 156.5328,
  regularMarketVolume: 117305597,
  regularMarketPreviousClose: 157.87,
  exchangeTimezoneName: "America/New_York",
  regularMarketOpen: 157.65,
};
const Stock = (props) => {
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

  return (
    <>
      <StockGraph />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Market Price</td>
            <td>{appleStockData.regularMarketPrice}</td>
          </tr>
          <tr>
            <td>Market Change</td>
            <td>{appleStockData.regularMarketChange}</td>
          </tr>
          <tr>
            <td>Market Change Percent</td>
            <td>{appleStockData.regularMarketChangePercent}</td>
          </tr>
          <tr>
            <td>MarketCap</td>
            <td>{appleStockData.marketCap}</td>
          </tr>
          <tr>
            <td>Market Day High</td>
            <td>{appleStockData.regularMarketDayHigh}</td>
          </tr>
          <tr>
            <td>Market Day Low</td>
            <td>{appleStockData.regularMarketDayLow}</td>
          </tr>
          <tr>
            <td>Market Volume</td>
            <td>{appleStockData.regularMarketVolume}</td>
          </tr>
          <tr>
            <td>Market Previous Close</td>
            <td>{appleStockData.regularMarketPreviousClose}</td>
          </tr>
          <tr>
            <td>Exchange Name?</td>
            <td>{appleStockData.exchangeTimezoneName}</td>
          </tr>
          <tr>
            <td>Market Open</td>
            <td>{appleStockData.regularMarketOpen}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Stock;

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
