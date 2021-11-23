import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import PortfolioDonutChart from './PortfolioDonutChart';
import { useState } from 'react';

const findEmailById = (id, users) => {
  for (const user of users) {
    if (user.id === id) {
      return user.email;
    }
  }
};

const LeaderboardCard = ((props) => {
  const { accounts, users } = props
  const [donut, setDonut] = useState(false)
  const onClick = () => setDonut(!donut)
  const leaderboardCards = accounts.map((account, index) => {
    const place = index + 1
    const email = findEmailById(account.user_id, users)
    return (
    <Card key={index} className="w-50 text-center" >
      <Card.Header as="h5">{place} {email}</Card.Header>
      <Card.Body>
        <Card.Title>Total Balance: {account.total_balance}</Card.Title>
        <Card.Text>
          {/* {`Current market value is ${item.quantity * item.current_spot_price} , representing  ${Number(item.quantity * item.current_spot_price / props.account.account.total_balance * 100).toFixed(2)}% of your total portfolio`} */}
        </Card.Text>
        <Button variant="primary" onClick={onClick}>View Summary</Button>
      </Card.Body>
    {donut ? <PortfolioDonutChart /> : null}
    </Card>

    )

  })
  return (
    <>
     {leaderboardCards}
    </>
  )
})

export default LeaderboardCard;