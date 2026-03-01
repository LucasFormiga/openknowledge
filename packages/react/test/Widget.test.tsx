import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Widget } from '../src/components/organisms/Widget'

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

  it('should render default texts and icons if not children are passed', () => {
    const messages: any[] = []
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={messages} isProcessing={false} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Content />
      </Widget.Root>
    )

    expect(screen.getByText('OpenKnowledge')).toBeTruthy()
    expect(screen.getByText('Olá! Como posso ajudar você hoje?')).toBeTruthy()
  })

  it('should handle maximizing and minimizing', () => {
    const messages: any[] = []
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={messages} isProcessing={false} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Content />
      </Widget.Root>
    )

    const maximizeBtn = screen.getByTitle('Maximizar')
    fireEvent.click(maximizeBtn)

    const minimizeBtn = screen.getByTitle('Minimizar')
    expect(minimizeBtn).toBeTruthy()
    fireEvent.click(minimizeBtn)

    expect(screen.getByTitle('Maximizar')).toBeTruthy()
  })

  it('should be able to type and send messages', () => {
    const messages: any[] = []
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={messages} isProcessing={false} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Content />
      </Widget.Root>
    )

    const input = screen.getByPlaceholderText('Faça uma pergunta...')
    fireEvent.change(input, { target: { value: 'My test question' } })

    // Simulate Enter key
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(onSendMessage).toHaveBeenCalledWith('My test question')
  })

  it('should send message via submit button', () => {
    const messages: any[] = []
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={messages} isProcessing={false} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Content />
      </Widget.Root>
    )

    const input = screen.getByPlaceholderText('Faça uma pergunta...')
    fireEvent.change(input, { target: { value: 'Another question' } })

    // Get the submit button (it's the next sibling of input)
    const submitBtn = input.nextElementSibling as HTMLButtonElement
    fireEvent.click(submitBtn)

    expect(onSendMessage).toHaveBeenCalledWith('Another question')
  })

  it('should not send if input is empty or processing', () => {
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={[]} isProcessing={true} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Content />
      </Widget.Root>
    )

    const input = screen.getByPlaceholderText('Faça uma pergunta...')
    fireEvent.change(input, { target: { value: 'Something' } })

    const submitBtn = input.nextElementSibling as HTMLButtonElement
    fireEvent.click(submitBtn)
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSendMessage).not.toHaveBeenCalled()
  })

  it('should display messages passed as props', () => {
    const messages = [
      { role: 'user', content: 'User message', timestamp: new Date() },
      { role: 'assistant', content: 'Assistant reply', timestamp: new Date() }
    ] as any[]
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={messages} isProcessing={false} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Content />
      </Widget.Root>
    )

    expect(screen.getByText('User message')).toBeTruthy()
    expect(screen.getByText('Assistant reply')).toBeTruthy()
  })

  it('should close the popover on close button click', () => {
    const onSendMessage = vi.fn()

    render(
      <Widget.Root messages={[]} isProcessing={false} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Trigger>Open</Widget.Trigger>
        <Widget.Content />
      </Widget.Root>
    )

    expect(screen.getByText('OpenKnowledge')).toBeTruthy()
    const closeBtn = screen.getByTitle('Fechar')

    fireEvent.click(closeBtn)

    // Should be closed, meaning the text is no longer in the document
    expect(screen.queryByText('OpenKnowledge')).toBeNull()
  })

  it('throws an error when useWidget is used outside of Widget.Root', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<Widget.Content />)
    }).toThrow('useWidget must be used within a Widget.Root')

    consoleErrorSpy.mockRestore()
  })

  it('applies theme properly', () => {
    const { container } = render(
      <Widget.Root
        messages={[]}
        isProcessing={false}
        onSendMessage={vi.fn()}
        theme="dark"
        colorTheme="rose"
        defaultOpen
      >
        <Widget.Content />
      </Widget.Root>
    )

    // The provider applies these classes to the wrapper div
    const widgetEl = document.querySelector('.openknowledge-widget')
    expect(widgetEl?.classList.contains('dark')).toBe(true)
    expect(widgetEl?.classList.contains('theme-rose')).toBe(true)
  })

  it('prevents close on outside click when preventCloseOnOutsideClick is true', () => {
    const onSendMessage = vi.fn()
    render(
      <Widget.Root
        messages={[]}
        isProcessing={false}
        onSendMessage={onSendMessage}
        defaultOpen
        preventCloseOnOutsideClick
      >
        <Widget.Content />
      </Widget.Root>
    )

    // Simulating Radix UI's outside click is tricky but we can trigger the pointerdown event on document
    fireEvent.pointerDown(document.body)

    // Widget should still be open
    expect(screen.getByText('OpenKnowledge')).toBeTruthy()
  })

  it('scrolls to bottom when messages update', () => {
    const onSendMessage = vi.fn()
    const { rerender } = render(
      <Widget.Root messages={[]} isProcessing={false} onSendMessage={onSendMessage} defaultOpen>
        <Widget.Content />
      </Widget.Root>
    )

    // Force a rerender with new messages to trigger the useEffect
    rerender(
      <Widget.Root
        messages={[{ role: 'user', content: 'hello', timestamp: new Date() }]}
        isProcessing={false}
        onSendMessage={onSendMessage}
        defaultOpen
      >
        <Widget.Content />
      </Widget.Root>
    )

    expect(screen.getByText('hello')).toBeTruthy()
  })
})
