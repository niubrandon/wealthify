import StockGraph from '../components/StockGraph';
import StockHeader from '../components/StockHeader';
import { useParams } from 'react-router-dom';

const Stock = (props) => {
  let { name } = useParams();
  return (
    <section className='page'>
      <StockHeader name={name} />
      <p>Stock</p>
    </section>
  );
};

export default Stock;
