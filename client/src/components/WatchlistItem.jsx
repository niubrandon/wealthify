import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/watchlistItem.scss'
import { MdOutlineClose } from 'react-icons/md';


const WatchlistItem = (props) => {

  return (
    <Link to={props.authUser ? `/stock/${props.item.ticker}`: '/401'} key={props.id} className="watchlist-card" >
      <header>
        <h2>{props.item.ticker}</h2>
        <button id={props.item.id} onClick={props.onDelete}><MdOutlineClose/></button>      
      </header>
      <footer>
        <p>{`$${Number(props.price).toFixed(2)} USD`}</p>
      </footer>
    </Link>
  )
}

export default WatchlistItem;