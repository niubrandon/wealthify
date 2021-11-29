import { Link } from 'react-router-dom';
import '../styles/components/watchlistItem.scss'
import { MdOutlineClose } from 'react-icons/md';

const WatchlistItem = (props) => {

  return (
    <article key={props.id} className="watchlist-card" >
      <header>
        <Link to={props.authUser ? `/stock/${props.item.ticker}`: '/401'} className='link'>{props.item.ticker}</Link>
        <button><MdOutlineClose id={props.item.id} className='watchlist-delete' onClick={props.onDelete}/></button>      
      </header>
      <footer>
        <p>{`$${Number(props.price).toFixed(2)} `}<span>/share</span></p>
      </footer>
    </article>
  )
}

export default WatchlistItem;