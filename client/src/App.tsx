import './App.css'

import React, { useState } from 'react'
import { useMyVotesQuery, useDeleteVoteMutation, useCreateVoteMutation } from './generated/generated-types'
import { Button, Col, Container, FormControl, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap'

function App() {
  const [deleteVote] = useDeleteVoteMutation()
  const [createVote] = useCreateVoteMutation()
  const [newValue, setNewValue] = useState<string>('')

  return (
    <div className="App">
      <Container>
        <Row>
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">new</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={e=>setNewValue(e.target.value)} value={newValue}/>
          </InputGroup>
          <Button onClick={() => {newValue && createVote({variables:{NFT:newValue}})}}>neu</Button>
        </Row>
        <Row>
          <Col>
            <h2>Votes (onload)</h2>
            <ListGroup>
              {useMyVotesQuery().data?.votes.map((v) => (
                <ListGroupItem>
                  <h5>{v?.NFT}</h5>
                  {v?._id}
                  <Button onClick={() => v && deleteVote({ variables: { id: v._id } })} variant="danger">
                    delete
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
