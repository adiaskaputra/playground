export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })

  const stream = event.node.res
  const send = (data: any) => {
    stream.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // SEND FIRST
  send({ message: 'SSE started', time: new Date().toISOString() })

  // UPDATE BY INTERVAL
  const interval = setInterval(() => {
    send({ time: new Date().toISOString() })
  }, 1000)

  // CLOSE
  event.node.req.on('close', () => {
    console.log('SSE closed')
    clearInterval(interval)
    stream.end()
  })
})
