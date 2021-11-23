import Table from 'react-bootstrap/Table';


  const Transactions = (props) => {


    const tableRows = props.account && props.account.transactions.map((item, index) => {
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
              { props.account && tableRows }
              </tbody>
            </Table>
  
    )
  }

  export default Transactions;