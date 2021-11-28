import { Doughnut } from 'react-chartjs-2';

const LeaderboardDonutChart = (props) => {
  const {stock_list, market_value} = props
  const backgroundColor = [];
  const hoverBackgroundColor = [];
  const randomColor = (() => {
    return Math.floor(Math.random()*16777215).toString(16);
  }) 
  for (let i = 0; i < stock_list.length; i++) {
    backgroundColor.push("#" + randomColor())
    hoverBackgroundColor.push("#" + randomColor())
  }

  const graphData = {
    labels: stock_list,
    datasets: [
      {
        label: 'Portfolio',
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        data: market_value
      }
    ]
  }
  return (
    <div style={{width:'300px', height: '300px'}}>
    {<Doughnut 
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

export default LeaderboardDonutChart;

