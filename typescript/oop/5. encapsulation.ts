class Person {
  name: string
  age: number
  private _phone: string
  protected nik: string
  static gender: string
  readonly birthday: string = "01 02 2001"

  constructor(name: string, age: number, phone: string, nik: string) {
    this.name = name
    this.age = age
    this._phone = phone
    this.nik = nik
  }

  get phone(): string {
    return this._phone
  }
  set phone(val: string) {
    this._phone = val
  }
}

class Chef extends Person {
  constructor(name: string, age: number, phone: string, nik: string) {
    super(name, age, phone, nik)
  }
}

const MasterChef = new Chef("adi", 27, "08995220152", "33111")
console.log(MasterChef.phone)
MasterChef.phone = "0895220153"
console.log(MasterChef.phone)


Person.gender = "Male"
Person.gender = "Female"
console.log(Person.gender)

export { }
