export default defineEventHandler((event) => {
  const coookie = getCookie(event, 'ella-http-only')
  event.node.req.headers = {
    ...event.node.req.headers,
    // do somehting else
  }
  console.log('middleware' + getRequestURL(event))
})
