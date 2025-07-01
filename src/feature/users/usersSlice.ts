import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'
import { RootState } from '@/app/store'
import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/app/withTypes'

interface User {
  id: string
  name: string
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const initialState: User[] = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
  selectors: {
    selectAllUsers: userState => userState,
    selectUserById: (userState, userId: string | null) => userState.find(user => user.id === userId),
  }
})

export default usersSlice.reducer;

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return selectUserById(state, currentUsername)
}
  