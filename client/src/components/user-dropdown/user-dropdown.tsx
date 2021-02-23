import React, { FunctionComponent, useEffect, useReducer, useState } from 'react'
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap'
import { UserAction } from '../../enums/user-action'
import {
  User,
  useUserAddedSubscription,
  useUserDeletedSubscription,
  useUsersQuery
} from '../../generated/generated-types'
import { initState, userReducer } from '../../reducer/user-reducer'

type ChildProps = {
  onChangeUser: (e: string) => void
}

const UserDropDown: FunctionComponent<ChildProps> = (props) => {
  const [user, setUser] = useState<User | undefined>()

  const [state, dispatch] = useReducer(userReducer, initState)
  const { data: users, loading: usersLoading, error: usersError } = useUsersQuery()

  const { data: userAdded } = useUserAddedSubscription()
  const { data: userDeleted } = useUserDeletedSubscription()

  useEffect(() => {
    users && users.users && dispatch({ type: UserAction.UsersLoaded, payload: users.users })
  }, [users])

  useEffect(() => {
    userAdded && userAdded.userAdded && dispatch({ type: UserAction.UserAdded, payload: userAdded.userAdded })
  }, [userAdded])

  useEffect(() => {
    userDeleted &&
      userDeleted.userDeleted &&
      dispatch({ type: UserAction.UserDeleted, payload: userDeleted.userDeleted })
    if (userDeleted?.userDeleted === user?._id) setUser(undefined)
  }, [userDeleted])

  return (
    <InputGroup size="lg">
      <DropdownButton
        as={InputGroup.Prepend}
        variant="outline-secondary"
        title={usersLoading ? 'loading users' : usersError ? usersError.message : 'Choose user'}
        id="input-group-dropdown-2"
      >
        {state?.users.map((u) => (
          <Dropdown.Item
            onClick={() => {
              setUser(u as User)
              u && props.onChangeUser(u._id)
            }}
          >
            {u?.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <FormControl contentEditable={false} aria-describedby="basic-addon2" value={user?.name || ''} readOnly />
    </InputGroup>
  )
}

export default UserDropDown
