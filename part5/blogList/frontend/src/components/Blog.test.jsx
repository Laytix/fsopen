import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import Blog from './Blog'

test('renders title and author but not URL or likes by default', () => {
  const blog = {
    title: 'Advanced Neural Networks for Computer Vision',
    author: 'Dr. Elena Rodriguez',
    url: 'https://aivision.example.com/advanced-cnn-architectures',
    likes: 427,
    user: {
      username: 'ai_researcher_42',
      name: 'Alex Chen',
    },
    id: '78f2b641c9a305d12e504c7a',
  }

  const { container } = render(<Blog blog={blog} />)

  // Check title and author are rendered
  const title = container.querySelector('.blog-title')
  expect(title).toBeDefined()
  expect(title.textContent).toBe(
    'Advanced Neural Networks for Computer Vision',
  )

  const author = container.querySelector('.blog-author')
  expect(author).toBeDefined()
  expect(author.textContent).toBe('by Dr. Elena Rodriguez')

  // Check URL and likes are NOT rendered by default
  const url = container.querySelector('.blog-url')
  expect(url).toBeNull()

  const likes = container.querySelector('.blog-likes')
  expect(likes).toBeNull()
})

test('shows URL and likes when the show button is clicked', async () => {
  const blog = {
    title: 'Advanced Neural Networks for Computer Vision',
    author: 'Dr. Elena Rodriguez',
    url: 'https://aivision.example.com/advanced-cnn-architectures',
    likes: 427,
    user: {
      username: 'ai_researcher_42',
      name: 'Alex Chen',
    },
    id: '78f2b641c9a305d12e504c7a',
  }

  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()

  // Click the show button
  const button = screen.getByText('show')
  await user.click(button)

  // Check URL and likes are now visible
  const url = container.querySelector('.blog-url')
  expect(url).toBeDefined()
  expect(url.textContent).toBe(
    'https://aivision.example.com/advanced-cnn-architectures',
  )

  const likes = container.querySelector('.blog-likes')
  expect(likes).toBeDefined()
  expect(likes.textContent).toContain('likes 427')
})

test('testing if the eventhandler registers the like button double click', async () => {

  const mockHandler = vi.fn()

  const blog = {
    title: 'Advanced Neural Networks for Computer Vision',
    author: 'Dr. Elena Rodriguez',
    url: 'https://aivision.example.com/advanced-cnn-architectures',
    likes: 427,
    user: {
      username: 'ai_researcher_42',
      name: 'Alex Chen',
    },
    id: '78f2b641c9a305d12e504c7a',
  }

  render(<Blog blog={blog} updateLikes={mockHandler} />)
  const user = userEvent.setup()

  //click on show button
  const button = screen.getByText('show')
  await user.click(button)

  //click on likes twice
  const likesbutton = screen.getByText('like')
  await user.click(likesbutton)
  await user.click(likesbutton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
