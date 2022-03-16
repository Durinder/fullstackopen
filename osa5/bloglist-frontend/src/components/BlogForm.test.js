import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> form calls event handler with correct data', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputUrl = screen.getByPlaceholderText('Url')
  const submitButton = screen.getByText('create')

  userEvent.type(inputTitle, 'This is Title')
  userEvent.type(inputAuthor, 'Written by Author')
  userEvent.type(inputUrl, 'hosted at URL')
  userEvent.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Written by Author')
  expect(createBlog.mock.calls[0][0].url).toBe('hosted at URL')
})