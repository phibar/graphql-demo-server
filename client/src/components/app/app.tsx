import React, { useEffect, useReducer, useState } from 'react'
import {
  useMyVotesQuery,
  useDeleteVoteMutation,
  useCreateVoteMutation,
  useVoteAddedSubscription,
  useVoteDeletedSubscription
} from '../../generated/generated-types'
import { Button, Col, Container, FormControl, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { appReducer, initState } from '../../reducer/app-reducer'
import { AppAction } from '../../enums/app-action'

function App() {
  const [deleteVoteMutation] = useDeleteVoteMutation()
  const [createVoteMutation] = useCreateVoteMutation()

  const [newValue, setNewValue] = useState<string>('')

  const [appState, dispatch] = useReducer(appReducer, initState)

  const { data: votes, loading: votesLoading, error: votesError } = useMyVotesQuery()
  const { data: added } = useVoteAddedSubscription()
  const { data: deleted } = useVoteDeletedSubscription()

  useEffect(() => {
    votes && votes.votes && dispatch({ type: AppAction.VotesLoaded, payload: votes.votes })
  }, [votes])

  useEffect(() => {
    added && added.voteAdded && dispatch({ type: AppAction.VoteAdded, payload: added.voteAdded })
  }, [added])

  useEffect(() => {
    deleted && deleted.voteDeleted && dispatch({ type: AppAction.VoteDeleted, payload: deleted.voteDeleted })
  }, [deleted])

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
              newValue && createVoteMutation({ variables: { NFT: newValue } })
            }}
          >
            neu
          </Button>
        </Row>
        <Row>
          <Col>
            <h2>Votes (onload)</h2>
            <ListGroup>
              {votesLoading && <ListGroupItem>Data is loading...</ListGroupItem>}
              {votesError && <ListGroupItem>{votesError.message}</ListGroupItem>}
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
