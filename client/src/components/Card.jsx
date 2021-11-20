import '../styles/components/card.scss';

const Card = (props) => {
  const { name, symbol, exchDisp } = props;
  return (
    <div className='card-container'>
      <div className='card-name'>
        <h1>{symbol}</h1>
        <p>{name}</p>
      </div>
      <div className='card-details'>{exchDisp && <p>{exchDisp}</p>}</div>
    </div>
  );
};

export default Card;
