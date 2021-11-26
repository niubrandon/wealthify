import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import WatchlistItem from '../components/WatchlistItem'

const Watchlist = (props) => {
  const {authUser, setAuthUser, account, setAccount} = props
  const [watchlist, setWatchlist] = useState([])
  const [deleteId, setDeleteId] = useState("")
  console.log("&&&&&&&&&&printing from watchlist page, authUser", authUser)
  
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
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
        const filteredWatchlist = response.data.filter(item => item.user_id === authUser.user_id);
        console.log("filtered data", filteredWatchlist)
        setWatchlist(filteredWatchlist);
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
        const filteredWatchlist = response.data.filter(item => item.user_id === authUser.user_id);
        console.log("filtered data", filteredWatchlist)
        setWatchlist(filteredWatchlist);
       
        
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
  const WatchlistItems = watchlist.map((item) => {
     return (
     <WatchlistItem key={item.id} item={item} authUser={authUser} onDelete={onDelete}/>
     )
      
    
  })

  return (
    <div style={flexWrapperVertical}>
      {WatchlistItems}
    </div>
  );
};

export default Watchlist;