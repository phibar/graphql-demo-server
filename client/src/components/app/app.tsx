import React, { useEffect, useReducer, useState } from 'react'

import { Button, Col, Container, FormControl, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { appReducer, initState } from '../../reducer/app-reducer'
import { AppAction } from '../../enums/app-action'
import {
  useCreateMemeMutation,
  useDeleteMemeMutation,
  useMemeAddedSubscription,
  useMemeDeletedSubscription,
  useMemesQuery
} from '../../generated/generated-types'

function App() {
  const [deleteVoteMutation] = useDeleteMemeMutation()
  const [createVoteMutation] = useCreateMemeMutation()

  const [newValue, setNewValue] = useState<string>('')

  const [appState, dispatch] = useReducer(appReducer, initState)

  const { data: memes, loading: memesLoading, error: memesError } = useMemesQuery()
  const { data: memeAdded } = useMemeAddedSubscription()
  const { data: memeDeleted } = useMemeDeletedSubscription()

  useEffect(() => {
    memes && memes.memes && dispatch({ type: AppAction.MemesLoaded, payload: memes.memes })
  }, [memes])

  useEffect(() => {
    memeAdded && memeAdded.memeAdded && dispatch({ type: AppAction.MemeAdded, payload: memeAdded.memeAdded })
  }, [memeAdded])

  useEffect(() => {
    memeDeleted && memeDeleted.memeDeleted && dispatch({ type: AppAction.MemeDeleted, payload: memeDeleted.memeDeleted })
  }, [memeDeleted])

  return (
    <div className="App">
      <Container>
        <Row>
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">new</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setNewValue(e.target.value)}
              value={newValue}
            />
          </InputGroup>
          <Button
            onClick={() => {
              newValue && createVoteMutation({ variables: { name: newValue } })
            }}
          >
            neu
          </Button>
        </Row>
        <Row>
          <Col>
            <h2>Memes</h2>
            <ListGroup>
              {memesLoading && <ListGroupItem>Data is loading...</ListGroupItem>}
              {memesError && <ListGroupItem>{memesError.message}</ListGroupItem>}
              {appState?.votes.map((v) => (
                <ListGroupItem key={v?._id}>
                  <h5>{v?.NFT}</h5>
                  {v?._id}
                  <Button onClick={() => v && deleteVoteMutation({ variables: { id: v._id } })} variant="danger">
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
