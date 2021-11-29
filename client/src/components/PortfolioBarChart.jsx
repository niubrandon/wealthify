import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';

const PortfolioBarChart = (props) => {
  console.log("debug from portfolio bar chart", props.data)
  const [graphData, setGraphData] = useState("")
  //let graphData = {};
  useEffect(() => {
    if (props.data.transactions.length === 0) {
      const newDate = Date.now()
      setGraphData({
        labels: [new Date(newDate).toLocaleDateString('en-US')],
        datasets: [
          {
            label: 'Daily Balance',
            backgroundColor: 'rgb(97, 190, 155)',
            borderColor: 'rgb(97, 190, 155)',
            borderWidth: 2,
            data: [0]
          }
        ]
      })
      } else {
    
      const xAxis = [];
    
      const yAxis = [];
    
      const priceHistoryArray = Object.values(props.data.history_prices);
    
      const transactionsArray = Object.values(props.data.transactions);
     
      const timeStampArray = priceHistoryArray[0].timestamp;


      for (const t of timeStampArray) {
        xAxis.push((new Date(Number(t) * 1000)).toLocaleDateString('en-US'));
      }
    
      for (let i = 0; i < timeStampArray.length; i++) {
        
        let marketValue = 0;
     
        for (const transaction of transactionsArray) {
          const transactionDate = Date.parse(transaction.created_at);
          const timeStampDate = Number(timeStampArray[i]) * 1000;
          // Date.parse(transaction.created_at) <= (Number(timeStampArray[i]) * 1000)
          if (new Date(transactionDate).toLocaleDateString('en-US') <= new Date(timeStampDate).toLocaleDateString('en-US')) {
            //edge case if price value is not available
            if (props.data.history_prices[transaction.ticker].close[i]) {
              marketValue += Number(transaction.quantity) * Number(transaction.trade) * props.data.history_prices[transaction.ticker].close[i];
            }
          
          }
          
        }
        yAxis.push(Number(marketValue.toFixed(2)));
      }
      console.log("x and y", xAxis, yAxis);
    
      setGraphData({
        labels: xAxis,
        datasets: [
          {
            label: 'Daily Investment Balance',
            backgroundColor: 'rgb(97, 190, 155)',
            borderColor: 'rgb(97, 190, 155)',
            borderWidth: 2,
            data: yAxis
          }
        ]
      })
      }
      



  },[props.data.transactions])
 
  
  return (
    <div>
     { graphData && <Bar
          data={graphData}
          options={{
            title:{
              display:true,
              text:'Daily Portfolio Performance',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />}
      </div>
  )
}

export default PortfolioBarChart;