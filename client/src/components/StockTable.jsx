import '../styles/components/stockTable.scss'
const StockTable = (props) => {
  const {
    regularMarketPrice,
    regularMarketChange,
    regularMarketChangePercent,
    marketCap,
    regularMarketDayHigh,
    regularMarketDayLow,
    regularMarketVolume,
    regularMarketPreviousClose,
    exchange,
    regularMarketOpen,
  } = props;
  return (
    <article id='stock-table'>
      <h2 className='title'>Key Performance Indicators</h2>
      <table className='info'>
        <tbody>
        <tr>
          <td>Regular Market Price</td>
          <td>{`$${regularMarketPrice.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Regular Market Change</td>
          <td>{`$${regularMarketChange.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Regular MarketChange Percent</td>
          <td>{`${regularMarketChangePercent.toFixed(2)}%`}</td>
        </tr>
        <tr>
          <td>Market Cap</td>
          <td>{`${(marketCap/1000000000).toFixed(2)}B`}</td>
        </tr>
        <tr>
          <td>Regular Market Day High</td>
          <td>{`$${regularMarketDayHigh.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Regular Market Day Low</td>
          <td>{`$${regularMarketDayLow.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Regular Market Volume</td>
          <td>{`${(regularMarketVolume/1000000).toFixed(2)}M`}</td>
        </tr>
        <tr>
          <td>Regular Market Previous Close</td>
          <td>{`$${regularMarketPreviousClose.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Exchange</td>
          <td>{exchange}</td>
        </tr>
        <tr>
          <td>Regular Market Open</td>
          <td>{`$${regularMarketOpen.toFixed(2)}`}</td>
        </tr>
        </tbody>
      </table>
    </article>
  );
};

export default StockTable;
