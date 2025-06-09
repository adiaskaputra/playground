package main

import "fmt"

func main() {
	data := [3]string{
		"Adi",
		"Prastya",
		"Putra",
	}

	fmt.Println(data)
	fmt.Println(data[2])

	//
	//
	//
	products := [5]string{
		"Book",
		"pencil",
		"pena",
		"ruler",
	}

	fmt.Println(products[4])
	fmt.Println(products[0])
	fmt.Println(len(products))

	//
	//
	//
	shorts := [...]string{
		"Short blue",
		"Short red",
	}

	fmt.Println("shorts length", len(shorts))
}
