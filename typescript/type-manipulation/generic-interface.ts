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

interface IResponseApi<T> {
  success: boolean
  message: string
  data: T
}

interface IBook {
  id: number
  title: string
  totalPages: number
  genre: string
}

interface IUser {
  id: number
  fullName: string
  role: string
}


const listBook: IResponseApi<IBook[]> = responseApiBook
const userProfile: IResponseApi<IUser> = responseApiProfile

