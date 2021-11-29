import Table from 'react-bootstrap/Table';


  const Transactions = (props) => {


    const tableRows = props.account && props.account.transactions.map((item, index) => {
      return (
        <tr key = {index} >
        <td>{index + 1}</td>
        <td>{item.ticker}</td>
        <td>{item.quantity}</td>
        <td>{item.trade === 1 ? "Buy" : "Sell"}</td>
        <td>{`$${(item.settled_price).toFixed(2)}`}</td>
        <td>{`$${(item.quantity * item.settled_price).toFixed(2)}`}</td>
      </tr>
      )
    })
    return (
      <Table responsive="xs" className="w-100" hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Qty</th>
          <th>Trade</th>
          <th>@ Price</th>
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