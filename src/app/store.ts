import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import postsReducer from "../feature/posts/postsSlice"
import userReducer from "../feature/users/usersSlice";
import authReducer from "../feature/auth/authSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: userReducer,
        auth: authReducer
    }
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>