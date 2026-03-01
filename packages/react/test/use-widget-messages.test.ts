import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useWidgetMessages } from '../src/hooks/use-widget-messages.js'

describe('useWidgetMessages', () => {
  it('should initialize with empty messages and not processing', () => {
    const { result } = renderHook(() => useWidgetMessages())
    
    expect(result.current.messages).toEqual([])
    expect(result.current.isProcessing).toBe(false)
  })

  it('should allow setting isProcessing', () => {
    const { result } = renderHook(() => useWidgetMessages())
    
    act(() => {
      result.current.setIsProcessing(true)
    })
    
    expect(result.current.isProcessing).toBe(true)
  })

  it('should append messages correctly', () => {
    const { result } = renderHook(() => useWidgetMessages())
    
    act(() => {
      result.current.appendMessage({ role: 'user', content: 'Hello' })
    })
    
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].role).toBe('user')
    expect(result.current.messages[0].content).toBe('Hello')
    expect(result.current.messages[0].timestamp).toBeInstanceOf(Date)

    act(() => {
      result.current.appendMessage({ role: 'assistant', content: 'Hi there' })
    })

    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[1].role).toBe('assistant')
    expect(result.current.messages[1].content).toBe('Hi there')
  })

  it('should clear messages', () => {
    const { result } = renderHook(() => useWidgetMessages())
    
    act(() => {
      result.current.appendMessage({ role: 'user', content: 'Hello' })
    })
    
    expect(result.current.messages).toHaveLength(1)

    act(() => {
      result.current.clearMessages()
    })
    
    expect(result.current.messages).toEqual([])
  })
})