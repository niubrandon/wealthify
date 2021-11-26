import Card from 'react-bootstrap/Card';
import React from 'react';
import Button from "react-bootstrap/Button";
import LeaderboardDonutChart from './LeaderboardDonutChart';
import { useState, useEffect } from 'react';
import axios from 'axios';


const LeaderboardCard = ((props) => {
  const { data } = props
  const [donut, setDonut] = useState()

  
  const leaderboardCards = data.map((account, index) => {
    const onClick = () => donut === account.account_id ? setDonut(null) : setDonut(account.account_id)
    const place = index + 1

    return (
    <Card key={index} className="w-70 text-center" >
      <Card.Header as="h5">{place} {account.email}</Card.Header>
      <Card.Body>
        <Card.Title>{`Total Balance: $${Number(account.total_balance).toFixed(2)}`}</Card.Title>
        <Card.Text>
          {/* {`Current market value is ${item.quantity * item.current_spot_price} , representing  ${Number(item.quantity * item.current_spot_price / props.account.account.total_balance * 100).toFixed(2)}% of your total portfolio`} */}
        </Card.Text>
        <Button variant="primary" onClick={onClick}>View Summary</Button>
      </Card.Body>
    {donut === account.account_id ? <LeaderboardDonutChart stock_list={account.stock_list} market_value={account.market_value}/> : null}
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