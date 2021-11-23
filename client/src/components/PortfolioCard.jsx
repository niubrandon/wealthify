
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

const PortfolioCard = ((props) => {

  const portfolioCards = props.account && props.account.portfolio.map((item, index) => {
    return (
    <Card key={index} className="w-50 text-center" >
      <Card.Header as="h5">{item.ticker}</Card.Header>
      <Card.Body>
        <Card.Title>quantity: {item.quantity}</Card.Title>
        <Card.Text>
          {`Current market value is ${item.quantity * item.current_spot_price} , representing  ${Number(item.quantity * item.current_spot_price / props.account.account.total_balance * 100).toFixed(2)}% of your total portfolio`}
        </Card.Text>
        <Button variant="primary">Buy</Button>
        <Button style={{marginLeft: '2em'}} variant="danger">Sell</Button>
      </Card.Body>
    </Card>
    )

  })
  return (
    <>
     {props.account && portfolioCards}
    </>
  )
})

export default PortfolioCard;