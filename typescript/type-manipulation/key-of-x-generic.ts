let user = {
  id: 1,
  fullName: "Adi Putra",
  role: "Admin",
  isActive: true
}


type Type = {
  id: number
  fullName: string
  role: string
  isActive: boolean
}

// type TypeKeyOf = keyof Type
// interface Key extends TypeKeyOf


function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}

const result = getProperty(user, 'fullName')
console.log(result)


export { }
