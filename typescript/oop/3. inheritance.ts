class Person {
  name: string;
  age: number;

  constructor(name: string, age: number = 27) {
    this.name = name
    this.age = age
  }

  eat() {
    console.log('Person Eat')
  }

  speak() {
    console.log("Person Speak")
  }
}


class Chef extends Person {
  wife: string

  constructor(name: string, age: number, wife: string) {
    super(name, age)
    this.wife = wife
  }

  speak(): void {
    console.log('Chef Speak')
  }

  cook() {
    console.log('Chef Cook')
  }
}

const MasterChef = new Chef("Adi", 27, 'intan')
MasterChef.speak()

export { }
