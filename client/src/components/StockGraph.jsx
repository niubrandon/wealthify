const StockGraph = (props) => {
  return (
    <p>StockGraph</p>
  )
}

export default StockGraph;


// const days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" }
// const close = [150, 151, 153.49000549316406, 157.8699951171875, 159.6199951171875]
// const timestamp = [1636986600, 1637073000, 1637159400, 1637245800, 1637338247]
// const currTimes = timestamp.map(time => days[new Date(Number(time) * 1000).getDay()])

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