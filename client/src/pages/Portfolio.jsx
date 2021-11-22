import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import PortfolioDonutChart from "../components/PortfolioDonutChart"; 

const Portfolio = (props) => {

  const [ account, setAccount ] = useState(null)
  //use hardcoded jwt token first
  useEffect(() => {
  /*   if (!account) {
      return
    } */
    const url = "http://localhost:3000/api/accounts/4";
    const config = {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzgxMzMzNTksImlzcyI6Imlzc3Vlcl9uYW1lIiwiYXVkIjoiY2xpZW50IiwidXNlcl9pZCI6NH0.bt5pZyy7RzYDsV1TEJV66fjy5xrqsJFGnUnr-JpCB50"
      }
    }
    axios.get(url, config).then( (response) => {
      console.log(response.data);
      setAccount(response.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [])

  const portfolio_cards = account && account.portfolio.map((item, index) => {
    return (
    <Card key={index} className="w-50 text-center" >
      <Card.Header as="h5">{item.ticker}</Card.Header>
      <Card.Body>
        <Card.Title>quantity: {item.quantity}</Card.Title>
        <Card.Text>
          {`Current market value is ${item.quantity * item.current_spot_price} , representing  ${Number(item.quantity * item.current_spot_price / account.account.total_balance * 100).toFixed(2)}% of your total portfolio`}
        </Card.Text>
        <Button variant="primary">Trade</Button>
      </Card.Body>
    </Card>
    )

  })

  const tableRows = account && account.transactions.map((item, index) => {
    return (
      <tr key = {index} >
      <td>{index + 1}</td>
      <td>{item.ticker}</td>
      <td>{item.quantity}</td>
      <td>{item.trade === 1 ? "buy" : "sell"}</td>
      <td>{item.settled_price}</td>
      <td>{item.quantity * item.settled_price}</td>
    </tr>
    )
  })
  const TransactionsTable = () => {
    return (

         <Table responsive="sm" className="w-50" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Trade</th>
              <th>Settled price</th>
              <th>Total</th>
            </tr>
            </thead>
            <tbody>
              { account && tableRows }
              </tbody>
            </Table>
  
    )
  }


  return (
    <>
    { account && <PortfolioDonutChart />}
    {account && portfolio_cards}
    <TransactionsTable />
    </>
  )
}

export default Portfolio;