import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.scss';
import axios from 'axios';
import React from 'react';
import {Line} from 'react-chartjs-2'

function App() {
  // const options = {
  //   method: 'GET',
  //   url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/chart/AAPL',
  //   headers: {
  //     'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
  //     'x-rapidapi-key': 'rw9oV5YAcGmshkCGpJdkhwRAXbnAp1HofApjsntB8od230Yqct'
  //   }
  // };
  
  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });

  return (
    <div className="App">
        <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home() {
  const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }
  return (
    <>
    <div style={{ position: "relative", margin: "auto", width: "60vw" }}>
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
              position:'right'
            }
          }}
        />
    </div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
      
    </>
  );
}

function About() {

  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}


export default App;
