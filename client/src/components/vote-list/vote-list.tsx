import React, { useEffect, useReducer } from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { VoteAction } from '../../enums/vote-action'
import {
  useVotesQuery,
  useDeleteVoteMutation,
  useVoteDeletedSubscription,
  useVoteAddedSubscription
} from '../../generated/generated-types'
import { initState, voteReducer } from '../../reducer/vote-reducer'

function VoteList() {
  const [state, dispatch] = useReducer(voteReducer, initState)
  const { data: votes, loading: votesLoading, error: votesError } = useVotesQuery()
  const [deleteVote] = useDeleteVoteMutation()

  const { data: voteAdded } = useVoteAddedSubscription()
  const { data: voteDeleted } = useVoteDeletedSubscription()

  useEffect(() => {
    votes && votes.votes && dispatch({ type: VoteAction.VotesLoaded, payload: votes.votes })
  }, [votes])

  useEffect(() => {
    voteAdded && voteAdded.voteAdded && dispatch({ type: VoteAction.VoteAdded, payload: voteAdded.voteAdded })
  }, [voteAdded])

  useEffect(() => {
    voteDeleted &&
      voteDeleted.voteDeleted &&
      dispatch({ type: VoteAction.VoteDeleted, payload: voteDeleted.voteDeleted })
  }, [voteDeleted])

  return (
    <ListGroup>
      <ListGroupItem>Votes</ListGroupItem>
      {votesLoading && <ListGroupItem>Data is loading...</ListGroupItem>}
      {votesError && <ListGroupItem>{votesError.message}</ListGroupItem>}
      {state?.votes.length === 0 && <ListGroupItem>no votes</ListGroupItem>}
      {state?.votes.map((m) => (
        <ListGroupItem key={m?._id}>
          <h5>{m?._id}</h5>
          <p>Owner:{m?.meme?.name}</p>
          <p>User:{m?.user?.name}</p>

          <Button onClick={() => m && deleteVote({ variables: { id: m._id } })} variant="danger">
            delete
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default VoteList
