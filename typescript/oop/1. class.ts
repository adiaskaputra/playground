class Car {
  model: string = ''
  year: number = 0
  price: string = ''


  drive() {
    console.log('The Car has Started driving')
  }
  stop() {
    console.log('The car has stopped')
  }
  detail() {
    console.log('D E T A I L')
    console.log(this.model)
    console.log(this.year)
    console.log(this.price)
  }
}


const tesla = new Car()
tesla.model = 'Model X'
tesla.year = 2022
tesla.price = '$15'
tesla.drive()
tesla.stop()
tesla.detail()

export { }
