let responseApi = {
  name: "Adi Prasetya Putra",
  nik: "3311041906940002",
  age: 24
}

interface IResponseApi {
  name: string
  nik: string
}
// OR
// interface IResponseApi {
//   name: string
//   nik: string
//   [key: string]: unknown
// }

let response: IResponseApi = responseApi
console.log(response)

export { }
