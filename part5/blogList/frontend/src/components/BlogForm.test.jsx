import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

test('form calls the event handler with right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // Fill in the form fields
  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const likesInput = screen.getByLabelText('likes')

  await user.type(titleInput, 'Testing React components')
  await user.type(authorInput, 'Jane Doe')
  await user.type(urlInput, 'https://example.com/testing')
  await user.clear(likesInput)
  await user.type(likesInput, '42')

  // Submit the form
  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  // Verify the event handler was called with correct arguments
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe('Testing React components')
  expect(createBlog.mock.calls[0][1]).toBe('Jane Doe')
  expect(createBlog.mock.calls[0][2]).toBe('https://example.com/testing')
  expect(createBlog.mock.calls[0][3]).toBe(42)
})