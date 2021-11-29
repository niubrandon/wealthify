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
      <table>
        <tbody className='info'>
          <tr>
            <td>Regular Market Price</td>
            <td>{regularMarketPrice}</td>
          </tr>
          <tr>
            <td>Regular Market Change</td>
            <td>{regularMarketChange}</td>
          </tr>
          <tr>
            <td>Regular MarketChange Percent</td>
            <td>{regularMarketChangePercent}</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{marketCap}</td>
          </tr>
          <tr>
            <td>Regular Market Day High</td>
            <td>{regularMarketDayHigh}</td>
          </tr>
          <tr>
            <td>Regular Market Day Low</td>
            <td>{regularMarketDayLow}</td>
          </tr>
          <tr>
            <td>Regular Market Volume</td>
            <td>{regularMarketVolume}</td>
          </tr>
          <tr>
            <td>Regular Market Previous Close</td>
            <td>{regularMarketPreviousClose}</td>
          </tr>
          <tr>
            <td>Exchange</td>
            <td>{exchange}</td>
          </tr>
          <tr>
            <td>Regular Market Open</td>
            <td>{regularMarketOpen}</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default StockTable;
