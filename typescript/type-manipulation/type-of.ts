const id: number = 1
const userId: typeof id = 3

const name: string = 'Adi'
const userName: typeof name = 'Putra'



let user = {
  id: 1,
  fullName: "Adi Putra",
  isActive: true
}

type User = {
  id: number
  fullName: string
  isActive: boolean
}

type TypeGetActive = (user: User) => boolean
const isUserActive1: ReturnType<TypeGetActive> = false
// OR
const getActive = (user: User) => user.isActive
const isUserActive2: ReturnType<typeof getActive> = false

console.log('getActive', getActive)
console.log('isUserActive1', isUserActive1)
console.log('isUserActive2', isUserActive2)

export { }
