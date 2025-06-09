//
//  T Y P E
//
type Book = {
  id: number
  title: string
  totalPages: number
}

type KeyBook = keyof Book

const exampleKey1: KeyBook = 'id'
const exampleKey2: KeyBook = 'title'
const exampleKey3: KeyBook = 'totalPages'
// const exampleKey4: KeyBook = 'olala'



//
//  I N T E R F A C E
//
interface IBook {
  id: number,
  title: string,
  totalPages: number
}

interface IKeyBook {
  key: keyof IBook
}

const exKey1: IKeyBook = { key: 'id' }
const exKey2: IKeyBook = { key: 'title' }
const exKey3: IKeyBook = { key: 'totalPages' }
// const exKey4: IKeyBook = { key: 'olala' }

export { }
