class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  greet(): string {
    return `hi, my name is ${this.name} and I am ${this.age} years old`
  }
}

class Student extends Person {
  id: string

  constructor(name: string, age: number, id: string) {
    super(name, age)
    this.id = id
  }

  study(): string {
    return `student ${this.name} (${this.id} studying)`
  }
}

const student = new Student("Adi", 27, "M0512001")
// I N V O K E
student.greet()
student.study()

// L O G S
console.log(student.greet())
console.log(student.study())
