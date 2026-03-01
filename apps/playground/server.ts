import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createAgent, parseEnv } from '@lucasformiga/openknowledge-core'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
const root = process.cwd()

async function startServer() {
  const app = express()
  app.use(express.json())

  const config = parseEnv(process.env)

  const agentConfigDir = path.resolve(__dirname, 'src/agent')
  const agent = await createAgent(config, agentConfigDir)

  // API Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body
      if (!message) {
        return res.status(400).json({ error: 'Message is required' })
      }

      console.log('Agent is thinking about:', message)
      const response = await agent.ask(message, undefined, history)
      res.json({ text: response })
    } catch (error) {
      console.error('Error in /api/chat:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  })

  let vite: any
  if (!isProd) {
    vite = await (await import('vite')).createServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(path.resolve(__dirname, 'dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      let template: string
      let render: any

      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      }

      const { html: appHtml } = render()

      const html = template.replace('<!--ssr-outlet-body-->', appHtml).replace('<!--ssr-outlet-head-->', '') // We don't have head tags yet

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  const port = process.env.PORT || 5173
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

startServer()
