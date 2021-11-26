import { Line } from "react-chartjs-2";

// const days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" }
// const fake_data = {
//   timestamp: [1636986600, 1637073000, 1637159400, 1637245800, 1637338247],
//   close: [150, 151, 153.49000549316406, 157.8699951171875, 159.6199951171875],
//   ticker: "APPL"
// }
// const close = [150, 151, 153.49000549316406, 157.8699951171875, 159.6199951171875]
// const timestamp = [1636986600, 1637073000, 1637159400, 1637245800, 1637338247]
// const currTimes = fake_data.timestamp.map(time => new Date(Number(time) * 1000).toLocaleDateString())

// const state = {
//   labels: currTimes,
//   datasets: [
//     {
//       label: 'USD',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: fake_data.close
//     }
//   ]
// }



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
              text:'Average Rainfall per month',
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


// const days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" }
// const close = [150, 151, 153.49000549316406, 157.8699951171875, 159.6199951171875]
// const timestamp = [1636986600, 1637073000, 1637159400, 1637245800, 1637338247]
// const currTimes = timestamp.map(time => new Date(Number(time) * 1000))

// console.log(currTimes)

// function Home() {
//   const state = {
//     labels: currTimes,
//     datasets: [
//       {
//         label: 'Rainfall',
//         fill: false,
//         lineTension: 0.5,
//         backgroundColor: 'rgba(75,192,192,1)',
//         borderColor: 'rgba(0,0,0,1)',
//         borderWidth: 2,
//         data: close
//       }
//     ]
//   }
//   return (
//     <>
//     <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
//       <Line
//           data={state}
//           options={{
//             title:{
//               display:true,
//               text:'Average Rainfall per month',
//               fontSize:20
//             },
//             legend:{
//               display:true,
//               position:'right'
//             }
//           }}
//         />
//     </div>
//       <main>
//         <h2>Welcome to the homepage!</h2>
//         <p>You can do this, I believe in you.</p>
//       </main>
//       <StockGraph>
//         <Link to="/about">About</Link>
//       </StockGraph>
      
//     </>
//   );
// }