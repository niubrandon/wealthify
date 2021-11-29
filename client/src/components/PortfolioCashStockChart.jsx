import { Doughnut } from 'react-chartjs-2';

const PortfolioDonutChart = (props) => {

const stockListArray = ["cash balance", "stock balance", "crypto balance"]
const stockMarketValueArray = [Number(props.account.account.cash_balance).toFixed(2)]
const stocks = []
const stocksValue = []
const crypto = []
const cryptoValue = []
for (const item of props.account.portfolio) {
  if (item.ticker.includes('-USD')) {
    crypto.push(item.ticker)
    cryptoValue.push(Number(Number(item.quantity) * Number(item.current_spot_price)).toFixed(2))
  }
  else {
    stocks.push(item.ticker)
    stocksValue.push(Number(Number(item.quantity) * Number(item.current_spot_price)).toFixed(2))
  }
}



const backgroundColor = [];
const hoverBackgroundColor = [];
const randomColor = (() => {
  return Math.floor(Math.random()*16777215).toString(16);
}) 
for (let i = 0; i < stockListArray.length; i++) {
  backgroundColor.push("#" + randomColor())
  hoverBackgroundColor.push("#" + randomColor())
}
console.log("color are", backgroundColor, hoverBackgroundColor)
console.log("portfolio data are", stockListArray, stockMarketValueArray)
  const graphData = {
    labels: stockListArray,
    datasets: [
      {
        label: 'Portfolio',
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        data: stockMarketValueArray
      }
    ]
  }
  return (
    <div style={{width:'400px', height: '400px'}}>
    {props.account && <Doughnut 
      data={graphData}
      options={{
        title:{
          display:true,
          text:'Portfolio % of each investment',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        },
        animation:{
          animateScale: true
        }
      }}
    />}
    </div>
  ) 
}

export default PortfolioDonutChart;

