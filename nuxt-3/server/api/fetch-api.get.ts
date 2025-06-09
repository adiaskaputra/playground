export default defineEventHandler(async (event) => {
  const response = await $fetch("http://localhost:5000/with-cors");
  return response;
});
