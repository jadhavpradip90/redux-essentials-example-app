import React from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { type Post, postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice'
import { selectCurrentUsername } from '../auth/authSlice';

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers)
  const userId = useAppSelector(selectCurrentUsername);
  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const author = elements.postAuthor.value
    dispatch(postAdded(title, content, author))

    e.currentTarget.reset()
  }

   const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postAuthor">Author:</label>
        <select>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />
        <button>Save Post</button>
      </form>
    </section>
  )
}