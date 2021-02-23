import React, { useEffect, useReducer } from 'react'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { UserAction } from '../../enums/user-action'
import {
  useUsersQuery,
  useDeleteUserMutation,
  useUserDeletedSubscription,
  useUserAddedSubscription
} from '../../generated/generated-types'
import { initState, userReducer } from '../../reducer/user-reducer'

function UserList() {
  const [state, dispatch] = useReducer(userReducer, initState)
  const { data: users, loading: usersLoading, error: usersError } = useUsersQuery()
  const [deleteUser] = useDeleteUserMutation()

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
  }, [userDeleted])

  return (
    <ListGroup>
      <ListGroupItem>Users</ListGroupItem>
      {usersLoading && <ListGroupItem>Data is loading...</ListGroupItem>}
      {usersError && <ListGroupItem>{usersError.message}</ListGroupItem>}
      {state?.users.length === 0 && <ListGroupItem>no users</ListGroupItem>}
      {state?.users.map((m) => (
        <ListGroupItem key={m?._id}>
          <h5>{m?.name}</h5>
          <p>Owner:{m?._id}</p>
          <p>Owner:{m?.wallet}</p>

          <Button onClick={() => m && deleteUser({ variables: { id: m._id } })} variant="danger">
            delete
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default UserList
