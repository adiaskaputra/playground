export default defineEventHandler((event) => {
  return proxyRequest(
    event,
    `http://localhost:5000/${event.context.params?.proxy || ""}`
  );
});
