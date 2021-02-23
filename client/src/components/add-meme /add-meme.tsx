import React, { useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useCreateMemeMutation, MemeCreateInput } from '../../generated/generated-types'
import UserDropDown from '../user-dropdown/user-dropdown'

function AddMeme() {
  const [meme, setMeme] = useState<MemeCreateInput>({})
  const [createMemeMutation] = useCreateMemeMutation()


  return (
    <section className="AddMeme">
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">memename</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setMeme({ ...meme, name: e.target.value })}
          value={meme?.name || ''}
        />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">nft</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setMeme({ ...meme, nft: e.target.value })}
          value={meme?.nft || ''}
        />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text>price</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setMeme({ ...meme, price: Number.parseFloat(e.target.value) })}
          value={meme?.price || ''}
          type="number"
          step="0.1"
        />
      </InputGroup>
      <UserDropDown onChangeUser={(e) => setMeme({ ...meme, owner: { _id: e } })}></UserDropDown>

      <Button
        onClick={() => {
          console.log(meme)
          meme && createMemeMutation({ variables: { meme: { ...meme } } }) && setMeme({})
          setMeme({})
        }}
      >
        add new meme
      </Button>
    </section>
  )
}

export default AddMeme
