import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

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
  const tableRows = account && account.transactions.map((item, index) => {
    return (
      <tr key = {index} >
      <td>{index + 1}</td>
      <td>{item.ticker}</td>
      <td>{item.quantity}</td>
      <td>{item.trade}</td>
      <td>{item.settled_price}</td>
      <td>{item.quantity * item.settled_price}</td>
    </tr>
    )
  })
  const TransactionsTable = () => {
    return (

         <Table responsive="sm" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Buy or sell</th>
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
    <TransactionsTable />
  )
}

export default Portfolio;