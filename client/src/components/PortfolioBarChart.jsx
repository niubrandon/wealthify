import {Bar} from 'react-chartjs-2';

const PortfolioBarChart = (props) => {

  const stockListArray = []
  const stockMarketValueArray = []
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
      {props.account && <Bar 
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
  
  export default PortfolioBarChart;