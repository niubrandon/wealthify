import { Doughnut } from 'react-chartjs-2';

const PortfolioDonutChart = (props) => {

  const state = {
    labels: ['ETH-USD', 'BTC-USD', 'DOT1-USD',
             'TLRY', 'CGC'],
    datasets: [
      {
        label: 'Portfolio',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [3999, 575, 3800, 3000, 360]
      }
    ]
  }
  return (
    <div style={{width:'400px', height: '400px'}}>
    <Doughnut 
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

export default PortfolioDonutChart;