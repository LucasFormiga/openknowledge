import { useWidgetMessages, Widget } from '@openknowledge/react'
import {
  Check,
  Code2,
  Copy,
  Globe,
  Import,
  LayoutTemplate,
  MessageSquare,
  Moon,
  Paintbrush,
  Palette,
  RotateCcw,
  Settings2,
  Sun,
  Type
} from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

type ColorTheme = 'default' | 'rose' | 'emerald' | 'violet'
type Language = 'pt-BR' | 'en' | 'es'

function App() {
  const [activeTab, setActiveTab] = useState<'controls' | 'code'>('controls')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default')
  const [language, setLanguage] = useState<Language>('pt-BR')
  const [customPrimaryColor, setCustomPrimaryColor] = useState('')
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)

  // New Text Overrides
  const [customTitle, setCustomTitle] = useState('')
  const [customSupportText, setCustomSupportText] = useState('')
  const [customGreeting, setCustomGreeting] = useState('')

  const [copiedReact, setCopiedReact] = useState(false)
  const [copiedJson, setCopiedJson] = useState(false)
  const [jsonImportText, setJsonImportText] = useState('')
  const [jsonError, setJsonError] = useState('')

  // Widget State
  const { messages, isProcessing, appendMessage, setIsProcessing } = useWidgetMessages()

  const handleSendMessage = async (text: string) => {
    // 1. Add user message locally
    appendMessage({ role: 'user', content: text })

    // 2. Set processing state
    setIsProcessing(true)

    // 3. Call actual API
    try {
      console.log('Sending message to server:', text)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch from /api/chat')
      }

      const data = await response.json()

      // 4. Add assistant response
      appendMessage({
        role: 'assistant',
        content: data.text || 'No response from AI'
      })
    } catch (error) {
      console.error('Error sending message:', error)
      appendMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const themeVariables = customPrimaryColor
    ? ({ '--primary': customPrimaryColor, '--ring': customPrimaryColor } as React.CSSProperties)
    : undefined

  const resetDefaults = () => {
    setTheme('light')
    setColorTheme('default')
    setLanguage('pt-BR')
    setCustomPrimaryColor('')
    setShowOnlineStatus(true)
    setCustomTitle('')
    setCustomSupportText('')
    setCustomGreeting('')
    setJsonImportText('')
    setJsonError('')
  }

  const themes: { id: ColorTheme; label: string; colorClass: string }[] = [
    { id: 'default', label: 'Zinc', colorClass: 'bg-zinc-900 dark:bg-zinc-100' },
    { id: 'rose', label: 'Rose', colorClass: 'bg-rose-600' },
    { id: 'emerald', label: 'Emerald', colorClass: 'bg-emerald-600' },
    { id: 'violet', label: 'Violet', colorClass: 'bg-violet-600' }
  ]

  const generateReactSnippet = () => {
    const props = []

    if (theme !== 'light') props.push(`theme="${theme}"`)
    if (colorTheme !== 'default') props.push(`colorTheme="${colorTheme}"`)
    if (language !== 'pt-BR') props.push(`uiLanguage="${language}"`)
    if (!showOnlineStatus) props.push(`showOnlineStatus={false}`)

    if (customPrimaryColor) {
      props.push(`themeVariables={{ '--primary': '${customPrimaryColor}', '--ring': '${customPrimaryColor}' }}`)
    }

    const customTexts = []
    if (customTitle) customTexts.push(`title: "${customTitle}"`)
    if (customGreeting) customTexts.push(`greeting: "${customGreeting}"`)
    if (customSupportText) customTexts.push(`supportText: "${customSupportText}"`)

    if (customTexts.length > 0) {
      props.push(`texts={{\n        ${customTexts.join(',\n        ')}\n      }}`)
    }

    const propsString = props.length > 0 ? `\n      ${props.join('\n      ')}\n    ` : ' '

    return `import { Widget, useWidgetMessages } from '@openknowledge/react';

export default function App() {
  const { messages, isProcessing, appendMessage, setIsProcessing } = useWidgetMessages();

  const handleSendMessage = async (text: string) => {
    appendMessage({ role: 'user', content: text });
    setIsProcessing(true);

    try {
      // Replace with your actual backend API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      }).then(res => res.json());

      appendMessage({ role: 'assistant', content: response.text });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Widget.Root
      messages={messages}
      isProcessing={isProcessing}
      onSendMessage={handleSendMessage}${propsString}>
      <Widget.Trigger />
      <Widget.Content />
    </Widget.Root>
  );
}`
  }

  const generateJsonConfig = () => {
    return JSON.stringify(
      {
        theme,
        colorTheme,
        language,
        showOnlineStatus,
        customPrimaryColor,
        customTitle,
        customGreeting,
        customSupportText
      },
      null,
      2
    )
  }

  const copyToClipboard = (text: string, type: 'react' | 'json') => {
    navigator.clipboard.writeText(text)
    if (type === 'react') {
      setCopiedReact(true)
      setTimeout(() => setCopiedReact(false), 2000)
    } else {
      setCopiedJson(true)
      setTimeout(() => setCopiedJson(false), 2000)
    }
  }

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonImportText)
      if (parsed.theme) setTheme(parsed.theme)
      if (parsed.colorTheme) setColorTheme(parsed.colorTheme)
      if (parsed.language) setLanguage(parsed.language)
      if (parsed.showOnlineStatus !== undefined) setShowOnlineStatus(parsed.showOnlineStatus)
      if (parsed.customPrimaryColor !== undefined) setCustomPrimaryColor(parsed.customPrimaryColor)
      if (parsed.customTitle !== undefined) setCustomTitle(parsed.customTitle)
      if (parsed.customGreeting !== undefined) setCustomGreeting(parsed.customGreeting)
      if (parsed.customSupportText !== undefined) setCustomSupportText(parsed.customSupportText)
      setJsonError('')
      // Update the textarea to reflect the applied config formatting
      setJsonImportText(JSON.stringify(parsed, null, 2))
    } catch (_e) {
      setJsonError('Invalid JSON format. Please check your configuration.')
    }
  }

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${theme === 'dark' ? 'dark bg-zinc-950 text-zinc-50' : 'bg-slate-50 text-zinc-950'}`}
    >
      {/* Sidebar Configuration Panel */}
      <aside className="w-full md:w-[420px] shrink-0 border-r border-border/50 bg-background/50 backdrop-blur-xl h-screen flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative">
        <div className="p-6 border-b border-border/50 bg-background sticky top-0 z-20 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2.5 rounded-xl shadow-sm">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">OpenKnowledge</h1>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Playground</p>
              </div>
            </div>
            <button
              onClick={resetDefaults}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              title="Reset all settings"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
            <button
              onClick={() => setActiveTab('controls')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'controls' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Settings2 className="w-4 h-4" /> Design
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Code2 className="w-4 h-4" /> Code & Import
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'controls' ? (
            <div className="space-y-10">
              {/* Appearance Section */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-foreground pb-2 border-b border-border/50">
                  <LayoutTemplate className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Appearance</h2>
                </div>

                {/* Mode Toggle */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">Mode</label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-muted/50 rounded-xl border border-border/50">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${theme === 'light' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Sun className="w-4 h-4" /> Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${theme === 'dark' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Moon className="w-4 h-4" /> Dark
                    </button>
                  </div>
                </div>

                {/* Online Status Toggle */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    Show Online Status
                    <button
                      onClick={() => setShowOnlineStatus(!showOnlineStatus)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${showOnlineStatus ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${showOnlineStatus ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </label>
                </div>

                {/* Color Theme Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Color Preset
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setColorTheme(t.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${colorTheme === t.id ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : 'border-border/50 bg-background hover:border-primary/50'}`}
                      >
                        <div className={`w-5 h-5 rounded-full ${t.colorClass} shadow-sm`} />
                        <span className="text-sm font-medium">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Theme Override */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Paintbrush className="w-4 h-4" /> Custom Primary (HSL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 200 50% 50%"
                    value={customPrimaryColor}
                    onChange={(e) => setCustomPrimaryColor(e.target.value)}
                    className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-muted-foreground/50"
                  />
                  {customPrimaryColor && (
                    <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Custom color active
                    </p>
                  )}
                </div>
              </section>

              {/* Content & Language Section */}
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-foreground pb-2 border-b border-border/50">
                  <Type className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-semibold uppercase tracking-wider">Content & Locale</h2>
                </div>

                {/* Language Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Interface Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' class='w-4 h-4 text-gray-500'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1em'
                    }}
                  >
                    <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="es">🇪🇸 Español</option>
                  </select>
                </div>

                {/* Text Overrides */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Override Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Support"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Override Greeting</label>
                    <input
                      type="text"
                      placeholder="e.g. How can we help today?"
                      value={customGreeting}
                      onChange={(e) => setCustomGreeting(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Override Support Footer</label>
                    <input
                      type="text"
                      placeholder="e.g. Powered by Acme Corp"
                      value={customSupportText}
                      onChange={(e) => setCustomSupportText(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              {/* React Code Export */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">React Implementation</h3>
                  <button
                    onClick={() => copyToClipboard(generateReactSnippet(), 'react')}
                    className="flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-md transition-colors"
                  >
                    {copiedReact ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedReact ? 'Copied' : 'Copy Code'}
                  </button>
                </div>
                <div className="bg-zinc-950 text-zinc-50 p-4 rounded-xl text-[13px] leading-relaxed overflow-x-auto border border-zinc-800 shadow-inner">
                  <pre>
                    <code className="font-mono">{generateReactSnippet()}</code>
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Copy this snippet into your React application to reproduce the exact widget configuration you've
                  designed.
                </p>
              </section>

              {/* JSON Config Import/Export */}
              <section className="space-y-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">JSON Configuration</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setJsonImportText(generateJsonConfig())
                        setJsonError('')
                      }}
                      className="flex items-center gap-1.5 text-xs font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground px-3 py-1.5 rounded-md transition-colors"
                    >
                      Export Current
                    </button>
                    <button
                      onClick={() => copyToClipboard(generateJsonConfig(), 'json')}
                      className="flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-md transition-colors"
                    >
                      {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedJson ? 'Copied' : 'Copy JSON'}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={jsonImportText}
                    onChange={(e) => setJsonImportText(e.target.value)}
                    placeholder="Paste JSON configuration here to import..."
                    className={`w-full bg-background border rounded-xl p-4 text-[13px] font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[160px] resize-y shadow-sm ${jsonError ? 'border-destructive focus:border-destructive' : 'border-border/50 focus:border-primary'}`}
                    spellCheck="false"
                  />
                  {jsonError && <p className="text-xs text-destructive mt-2 font-medium">{jsonError}</p>}
                </div>
                <button
                  onClick={handleImportJson}
                  disabled={!jsonImportText.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Import className="w-4 h-4" /> Apply Configuration
                </button>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You can paste a previously exported JSON configuration here and click "Apply" to load those settings
                  into the playground.
                </p>
              </section>
            </div>
          )}
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 relative overflow-hidden bg-dot-pattern">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="h-full flex flex-col items-center justify-center p-12 text-center z-10 relative">
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 p-8 rounded-3xl shadow-2xl max-w-2xl w-full mx-auto space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-inner">
              <LayoutTemplate className="w-10 h-10 text-primary -rotate-3" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Mock Application Environment</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              This area simulates your host application. The widget is positioned in the bottom right corner.
            </p>

            <div className="pt-8 flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border/50 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Preview Active
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* The Actual Widget Implementation */}
      <Widget.Root
        messages={messages}
        isProcessing={isProcessing}
        onSendMessage={handleSendMessage}
        theme={theme}
        colorTheme={colorTheme}
        uiLanguage={language}
        themeVariables={themeVariables}
        showOnlineStatus={showOnlineStatus}
        preventCloseOnOutsideClick={true}
        texts={{
          ...(customTitle ? { title: customTitle } : {}),
          ...(customGreeting ? { greeting: customGreeting } : {}),
          ...(customSupportText ? { supportText: customSupportText } : {})
        }}
      >
        <Widget.Trigger />
        <Widget.Content />
      </Widget.Root>
    </div>
  )
}

export default App
