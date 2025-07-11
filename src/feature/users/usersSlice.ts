import { client } from '@/api/client'
import { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'

interface User {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
  selectors: {
    /*selectAllUsers: userState => userState,
    selectUserById: (userState, userId: string | null) => userState.find(user => user.id === userId),*/
  }
})

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors((state: RootState) => state.users)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (!currentUsername) {
    return
  }
  return selectUserById(state, currentUsername)
}
  