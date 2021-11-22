import { Table } from "react-bootstrap";
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
    exchangeTimezoneName,
    regularMarketOpen,
  } = props;
  return (
    <div>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td>regularMarketPrice</td>
            <td>{regularMarketPrice}</td>
          </tr>
          <tr>
            <td>regularMarketChange</td>
            <td>{regularMarketChange}</td>
          </tr>
          <tr>
            <td>regularMarketChangePercent</td>
            <td colSpan="2">{regularMarketChangePercent}</td>
          </tr>
          <tr>
            <td>marketCap</td>
            <td>{marketCap}</td>
          </tr>
          <tr>
            <td>regularMarketDayHigh</td>
            <td>{regularMarketDayHigh}</td>
          </tr>
          <tr>
            <td>regularMarketDayLow</td>
            <td colSpan="2">{regularMarketDayLow}</td>
          </tr>
          <tr>
            <td>regularMarketVolume</td>
            <td>{regularMarketVolume}</td>
          </tr>
          <tr>
            <td>regularMarketPreviousClose</td>
            <td>{regularMarketPreviousClose}</td>
          </tr>
          <tr>
            <td>exchangeTimezoneName</td>
            <td colSpan="2">{exchangeTimezoneName}</td>
          </tr>
          <tr>
            <td>regularMarketOpen</td>
            <td colSpan="2">{regularMarketOpen}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default StockTable;
