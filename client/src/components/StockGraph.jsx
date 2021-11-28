import { Line } from "react-chartjs-2";

const StockGraph = (props) => {
  const {xAxis, yAxis, range} = props

  const handleRange = function(range) {
    const x = xAxis
    let returnArr = []
    if (range === "5d") {
      returnArr = x.map(time => new Date(Number(time) * 1000).toLocaleDateString())
    }
    else if (range === "1d") {
      returnArr = x.map(time => new Date(Number(time) * 1000).toLocaleTimeString())
    }
    else {
      returnArr = x.map(time => new Date(Number(time) * 1000).toLocaleDateString())
    }
    return returnArr;
  }

  const currTimes = handleRange(range)

  const state = {
    labels: currTimes,
    datasets: [
      {
        label: 'USD',
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(81, 167, 134, 1)',
        borderWidth: 2,
        data: yAxis
      }
    ]
  }

  return (
    <>
      <div style={{ position: "relative", margin: "auto", width: "90%"}}>
      <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Stock Price',
              fontSize:20
            },
            legend:{
              display:true,
              position:'left'
            }
          }}
        />
    </div>
    </>
  )
}

export default StockGraph;
