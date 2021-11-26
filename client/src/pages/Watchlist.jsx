import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

const Watchlist = (props) => {
  const {authUser, setAuthUser, account, setAccount} = props
  // console.log("authUser", authUser)

  const [watchlist, setWatchlist] = useState([])
  const [watchlistid, setWatchlistid] = useState("")
  const [deleting, setDeleting] = useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem('auth')) {
  //     props.setAuthUser(JSON.parse(localStorage.getItem('auth')));
  //   }
  // }, []);


  useEffect(() => {

    if (!deleting) {
      return
    }

    axios({
      method: 'delete',
      url: `http://localhost:3000/api/watchlists/${watchlistid}`,
    })
      .then(function (response) {
        console.log("deleted")
        // console.log(response.data)
        // setWatchlist(response.data)
        setDeleting(false);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [deleting])

  useEffect(() => {
/*     if (!props.authUser) {
      return;
    } */
    if (deleting) {
      return
    }
    const url = `http://localhost:3000/api/watchlists`;
    const config = {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzgxMzMzNTksImlzcyI6Imlzc3Vlcl9uYW1lIiwiYXVkIjoiY2xpZW50IiwidXNlcl9pZCI6NH0.bt5pZyy7RzYDsV1TEJV66fjy5xrqsJFGnUnr-JpCB50",
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        // console.log("a", response.data)
        // const filteredWatchlist = response.data.filter(item => item.user_id === authUser.user_id);
        // console.log("filtered data", filteredWatchlist)
        // setWatchlist(filteredWatchlist);
        setWatchlist(response.data)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [watchlistid]);

  const flexWrapperVertical = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  // console.log("b", watchlist)

  const onDelete= (stockId) => {
    setWatchlistid(stockId);
    setDeleting(true);
  }
  
  const watchlistMap = watchlist.map((stock, index) => {
   
    return (
      <Card key={index} className="w-30 text-center" >
      <Card.Header as="h5">{stock.ticker}</Card.Header>
      <Card.Body>
        <Card.Title>{`Total Balance: fill in later`}</Card.Title>
        <Card.Text>
          Watchlist ID: {stock.id} User ID: {stock.user_id}
        </Card.Text>
        <Button variant="primary" onClick={onDelete(`${stock.id}`)}>Delete</Button>
      </Card.Body>
    </Card>
    )
  })

  return (
    <div style={flexWrapperVertical}>
      {watchlistMap}
    </div>
  );
};

export default Watchlist;