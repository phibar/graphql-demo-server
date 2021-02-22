import './App.css'

import React from 'react'
import { useMyVotesQuery } from './generated/generated-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <ListGroup>
        {useMyVotesQuery().data?.votes.map((v) => (
          <ListGroupItem>
            <h5>{v?.NFT}</h5>
            {v?._id}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}

export default App
