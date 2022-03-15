import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author only', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'URL',
    likes: 4,
    user: {
      username: 'Peelo',
      name: 'Pekka Elo',
      id: '620a568e37b81dea264aab3d'
    },
    id: '622f6b1028902e0e26885bd9'
  }

  render(<Blog blog={blog} />)


  const element = screen.getByText('Title Author')
  expect(element).toBeDefined()
})