import { Doughnut } from 'react-chartjs-2';

const PortfolioDonutChart = (props) => {

  const stockListArray = ["cash balance"]
  const stockMarketValueArray = [Number(props.account.account.cash_balance).toFixed(2)]
  for (const item of props.account.portfolio) {
    
    stockListArray.push(item.ticker)
    stockMarketValueArray.push(Number(Number(item.quantity) * Number(item.current_spot_price)).toFixed(2))
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
    <div style={{width:'450px', height: '450px'}}>
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

