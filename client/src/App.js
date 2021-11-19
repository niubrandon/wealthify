import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.scss';
import axios from 'axios';

function App() {

  const options = {
    method: 'GET',
    url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote',
    params: {symbols: 'AAPL,ETH-USD'},
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': 'rw9oV5YAcGmshkCGpJdkhwRAXbnAp1HofApjsntB8od230Yqct'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
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
  return (
    <>
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
