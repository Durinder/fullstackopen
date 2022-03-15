import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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
  const user = {
    name: 'Pekka Elo'
  }

  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )
    expect(component.container).toHaveTextContent(
      'Title Author'
    )
    expect(component.container).not.toHaveTextContent(
      'URL'
    )
  })

  test('clicking the view button shows also url and likes', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )
    const button = component.getByText('view')
    userEvent.click(button)

    expect(component.container).toHaveTextContent('URL')
    expect(component.container).toHaveTextContent('likes 4')
  })
})