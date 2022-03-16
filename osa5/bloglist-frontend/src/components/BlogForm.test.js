import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> form calls event handler with correct data', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')
  const submitButton = screen.getByText('create')

  userEvent.type(input[0], 'Title')
  userEvent.type(input[1], 'Author')
  userEvent.type(input[2], 'URL')
  userEvent.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Author')
  expect(createBlog.mock.calls[0][0].url).toBe('URL')
})