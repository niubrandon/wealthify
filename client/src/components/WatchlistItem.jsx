import { useState, useEffect } from 'react';
import {Card, Button} from 'react-bootstrap';


const WatchlistItem = (props) => {
 
  return (
    <div>
      <Card key={props.id} className="w-30 text-center" >
        <Card.Header as="h5">{props.item.ticker}</Card.Header>
        <Card.Body>
          <Button id={props.item.id} variant="primary" onClick={props.onDelete} >Delete</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default WatchlistItem;