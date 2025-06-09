type AGE = number | string
let profileAlias: { name: string, age: AGE, isActive: boolean } = {
  name: "Adi Prasetya Putra",
  age: 27,
  isActive: true,
}
profileAlias = {
  name: "Intan",
  age: '22',
  isActive: true
}


type Point = {
  x: number,
  y: number
}
let point: Point;
point = { x: 10, y: 10 }

type Cat = {
  weight: number,
  name: string
}
type Dog = {
  weight: number
  age: number
}
let animal1: Cat | Dog;
animal1 = {
  weight: 20,
  age: 20,
  name: 'olala'
}

let animal2: Cat & Dog;
// animal2 = {
//   weight: 20,
//   age: 20,
// }

export { }
