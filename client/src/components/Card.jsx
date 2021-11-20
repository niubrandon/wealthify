const Card = (props) => {
  const { name, symbol, exchDisp } = props;
  return (
    <>
      <div className='card-container'>
        <h1>{symbol}</h1>
        <p>{name}</p>
        {exchDisp && <p>{exchDisp}</p>}
      </div>
    </>
  );
};

export default Card;
