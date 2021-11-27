import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import WatchlistItem from '../components/WatchlistItem'
import '../styles/pages/watchlist.scss'

const Watchlist = (props) => {
  const {authUser, setAuthUser, account, setAccount} = props
  const [watchlist, setWatchlist] = useState([])
  const [prices, setPrices] = useState([])
  const [deleteId, setDeleteId] = useState("")
  console.log("&&&&&&&&&&printing from watchlist page, authUser", authUser)
  
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);

   useEffect(() => {
    if (!authUser) {
      <Navigate to='/401' />;
    }
  }, []);


  useEffect(() => {

    if (!deleteId) {
      return
    }

    axios({
      method: 'delete',
      url: `http://localhost:3000/api/watchlists/${deleteId}`,
    })
      .then(function (response) {
        console.log("deleted")
        console.log("server response for watchlist data after deleting", response.data, authUser.user_id)
        const filteredWatchlist = response.data.watchlists.filter(item => item.user_id === authUser.user_id);
        console.log("filtered data", filteredWatchlist)
        setWatchlist(filteredWatchlist);
        setPrices(response.data.prices)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [deleteId])
 
//fetch all the data
  useEffect(() => {
    if (!authUser) {
      console.log("user is not login!")
      return
    }
    const url = `http://localhost:3000/api/watchlists`;
    axios
      .get(url)
      .then((response) => {
        console.log("server response for watchlist data", response.data, authUser.user_id)
        const filteredWatchlist = response.data.watchlists.filter(item => item.user_id === authUser.user_id);
        console.log("filtered data", filteredWatchlist)
        setWatchlist(filteredWatchlist);
        setPrices(response.data.prices)
       
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authUser]); 

  const flexWrapperVertical = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  // console.log("b", watchlist)

   const onDelete= (e) => {
    console.log("deleting", e.target.id)
    setDeleteId(e.target.id)
  
  }

/*   const findPriceFromTicker = (ticker, arr) => {
    for (const element of arr) {
      if (element.ticker) {
        return element.ticker
      }
    }
  }
 */
  const WatchlistItems = watchlist.map((item) => {
    const stockPrice = prices[item.ticker]
    console.log("stock price is ", stockPrice)
     return (
     
     <WatchlistItem key={item.id} item={item} authUser={authUser} onDelete={onDelete} price={stockPrice}/>
     )
      
    
  })

  return (
    <section id='watchlist' className='page'>
      <h1 className='watchlist-title'>
        Watching on <span>Wealthify</span>
      </h1>
      <div className='watchlist-container'>
        {WatchlistItems}
      </div>
    </section>
  );
};

export default Watchlist;