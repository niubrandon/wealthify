import {Bar} from 'react-chartjs-2';

const PortfolioBarChart = (props) => {
  console.log("printing from barchar ", props.data)

    //create xAxis with time for one week range
  const xAxis = [];
  //create yAxis for the stocks total value for one week range
  const yAxis = [];
  //convert the price history to array
  const priceHistoryArray = Object.values(props.data.history_prices);
  //convert the transactions to array
  const transactionsArray = Object.values(props.data.transactions);
  //create a time stamp array - readable format
  const timeStampArray = priceHistoryArray[0].timestamp;
  for (const t of timeStampArray) {
    xAxis.push((new Date(Number(t) * 1000)).toLocaleDateString('en-US'));
  }
  //loop through timestamparray which is xAxis but in readable format
  for (let i = 0; i < timeStampArray.length; i++) {
    
    let marketValue = 0;
    //loop through all transactions than happened before that date and sum all market value together thourgh looping each transaction
    for (const transaction of transactionsArray) {
      if (Date.parse(transaction.created_at) <= (Number(timeStampArray[i]) * 1000)) {
        //edge case if price value is not available
        if (props.data.history_prices[transaction.ticker].close[i]) {
          marketValue += Number(transaction.quantity) * Number(transaction.trade) * props.data.history_prices[transaction.ticker].close[i];
        }
      
      }
      
    }
    yAxis.push(Number(marketValue.toFixed(2)));
  }

  console.log("finsihed data", xAxis, yAxis)


  const state = {
    labels: xAxis,
    datasets: [
      {
        label: 'Daily Stock Balance',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: yAxis
      }
    ]
  }
  
  return (
    <div>
      <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
  )
}

export default PortfolioBarChart