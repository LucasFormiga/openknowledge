import { fireEvent, render, screen } from '@testing-library/react'
import { Widget } from './index.js'

describe('Widget', () => {
  it('should render trigger and open content on click', () => {
    const messages: any[] = []
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={messages} isProcessing={false} onSendMessage={onSendMessage}>
        <Widget.Trigger>Open</Widget.Trigger>
        <Widget.Content>Hello Knowledge</Widget.Content>
      </Widget.Root>
    )

    expect(screen.queryByText('Hello Knowledge')).toBeNull()

    fireEvent.click(screen.getByText('Open'))

    expect(screen.getByText('Hello Knowledge')).toBeTruthy()
  })
})
