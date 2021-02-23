import React, { useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useCreateUserMutation, User, UserCreateInput } from '../../generated/generated-types'

function AddUser() {
  const [user, setUser] = useState<UserCreateInput>({})
  const [createUserMutation] = useCreateUserMutation()

  return (
    <section className="AddUser">
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">username</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          value={user?.name || ''}
        />
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-lg">wallet</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => setUser({ ...user, wallet: e.target.value })}
          value={user?.wallet || ''}
        />
      </InputGroup>
      <Button
        onClick={() => {
          user && createUserMutation({ variables: { user: { ...user } } }) && setUser({})
        }}
      >
        add new user
      </Button>
    </section>
  )
}

export default AddUser
