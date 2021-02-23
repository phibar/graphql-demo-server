import React, { useEffect, useReducer } from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { MemeAction } from '../../enums/meme-action'
import {
  useMemesQuery,
  useDeleteMemeMutation,
  useMemeDeletedSubscription,
  useMemeAddedSubscription,
  useMemeVotedSubscription
} from '../../generated/generated-types'
import { initState, memeReducer } from '../../reducer/meme-reducer'

function MemeList() {
  const [state, dispatch] = useReducer(memeReducer, initState)
  const { data: memes, loading: memesLoading, error: memesError } = useMemesQuery()
  const [deleteMeme] = useDeleteMemeMutation()

  const { data: memeAdded } = useMemeAddedSubscription()
  const { data: memeDeleted } = useMemeDeletedSubscription()
  const { data: memeVoted } = useMemeVotedSubscription()

  useEffect(() => {
    memes && memes.memes && dispatch({ type: MemeAction.MemesLoaded, payload: memes.memes })
  }, [memes])

  useEffect(() => {
    memeAdded && memeAdded.memeAdded && dispatch({ type: MemeAction.MemeAdded, payload: memeAdded.memeAdded })
  }, [memeAdded])

  useEffect(() => {
    console.log("VOTED",memeVoted)
    memeVoted && memeVoted.memeVoted && dispatch({ type: MemeAction.MemeVoted, payload: memeVoted.memeVoted })
  }, [memeVoted])

  useEffect(() => {
    memeDeleted &&
      memeDeleted.memeDeleted &&
      dispatch({ type: MemeAction.MemeDeleted, payload: memeDeleted.memeDeleted })
  }, [memeDeleted])
  
  return (
    <ListGroup>
      <ListGroupItem>Memes</ListGroupItem>
      {memesLoading && <ListGroupItem>Data is loading...</ListGroupItem>}
      {memesError && <ListGroupItem>{memesError.message}</ListGroupItem>}
      {state?.memes.length === 0 && <ListGroupItem>no memes</ListGroupItem>}
      {state?.memes.map((m) => (
        <ListGroupItem key={m?._id}>
          <h5>{m?.name}</h5>
          {m?._id}
          <p>Owner:{m?.owner?.name}</p>
          <p>NFT:{m?.nft}</p>
          <p>price:{m?.price}</p>
          <p>votes:{m?.votes?.keys && Array.from(m.votes.values()).length}</p>
          

          <Button onClick={() => m && deleteMeme({ variables: { id: m._id } })} variant="danger">
            delete
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default MemeList
