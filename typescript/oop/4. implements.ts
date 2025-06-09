class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  speak() {
    console.log("Person Speak")
  }

  eat() {
    console.log("Person Speak")
  }
}


class Chef implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  speak(): void {
    console.log("Chef Speak")
  }

  eat(): void {
    console.log('Chef Eeat')
  }
}

const masterChef = new Chef('Adi', 27)
masterChef.speak()


export { }
