import React, { FunctionComponent, useEffect, useReducer, useState } from 'react'
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap'
import { MemeAction } from '../../enums/meme-action'
import {
  Meme,
  useMemeAddedSubscription,
  useMemeDeletedSubscription,
  useMemesQuery
} from '../../generated/generated-types'
import { initState, memeReducer } from '../../reducer/meme-reducer'

type ChildProps = {
  onChangeMeme: (e: string) => void
}

const MemeDropDown: FunctionComponent<ChildProps> = (props) => {
  const [meme, setMeme] = useState<Meme | undefined>()

  const [state, dispatch] = useReducer(memeReducer, initState)
  const { data: memes, loading: memesLoading, error: memesError } = useMemesQuery()

  const { data: memeAdded } = useMemeAddedSubscription()
  const { data: memeDeleted } = useMemeDeletedSubscription()

  useEffect(() => {
    memes && memes.memes && dispatch({ type: MemeAction.MemesLoaded, payload: memes.memes })
  }, [memes])

  useEffect(() => {
    memeAdded && memeAdded.memeAdded && dispatch({ type: MemeAction.MemeAdded, payload: memeAdded.memeAdded })
  }, [memeAdded])

  useEffect(() => {
    memeDeleted &&
      memeDeleted.memeDeleted &&
      dispatch({ type: MemeAction.MemeDeleted, payload: memeDeleted.memeDeleted })
    if (memeDeleted?.memeDeleted === meme?._id) setMeme(undefined)
  }, [memeDeleted])

  return (
    <InputGroup size="lg">
      <DropdownButton
        as={InputGroup.Prepend}
        variant="outline-secondary"
        title={memesLoading ? 'loading memes' : memesError ? memesError.message : 'Choose meme'}
        id="input-group-dropdown-2"
      >
        {state?.memes.map((u) => (
          <Dropdown.Item
            onClick={() => {
              setMeme(u as Meme)
              u && props.onChangeMeme(u._id)
            }}
          >
            {u?.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <FormControl contentEditable={false} aria-describedby="basic-addon2" value={meme?.name || ''} readOnly />
    </InputGroup>
  )
}

export default MemeDropDown
