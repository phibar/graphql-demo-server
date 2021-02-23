import React, { useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useCreateVoteMutation, Vote, VoteCreateInput } from '../../generated/generated-types'
import MemeDropDown from '../meme-dropdown/meme-dropdown'
import UserDropDown from '../user-dropdown/user-dropdown'

function AddVote() {
  const [vote, setVote] = useState<VoteCreateInput>({ user: { _id: '' }, meme: { _id: '' } })
  const [createVoteMutation] = useCreateVoteMutation()

  return (
    <section className="AddVote">
        <UserDropDown onChangeUser={(e) => setVote({ ...vote, user: { _id: e } })}></UserDropDown>
        <MemeDropDown onChangeMeme={(e) => setVote({ ...vote, meme: { _id: e } })}></MemeDropDown>

      <Button
        onClick={() => {
          vote && createVoteMutation({ variables: { vote: { ...vote } } })
          setVote({ user: { _id: '' }, meme: { _id: '' } })
        }}
        disabled={vote.meme._id === '' || vote.user._id === ''}
      >
        add new vote
      </Button>
    </section>
  )
}

export default AddVote
