const responseApiBook = {
  success: true,
  message: "Success get data",
  data: [
    {
      id: 1,
      title: "The Demon in The House",
      totalPages: 10,
      genre: "Crime",
    }
  ]
}

const responseApiProfile = {
  success: true,
  message: "Success get data",
  data: {
    id: 1,
    fullName: "John Doe",
    role: "Admin"
  }
}

type ResponseApi<T> = {
  success: boolean,
  message: string,
  data: T
}

type Book = {
  id: number
  title: string
  totalPages: number
  genre: string
}

type User = {
  id: number
  fullName: string
  role: string
}

const listBook: ResponseApi<Book[]> = responseApiBook
const userProfile: ResponseApi<User> = responseApiProfile

export { }
