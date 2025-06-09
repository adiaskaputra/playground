export default defineEventHandler(async (event) => {
  const coookie = getCookie(event, 'ella-http-only')

  // maybe for hit api and get response
  // const response = await $fetch("http://localhost:5000/with-cors");

  return coookie;
});
