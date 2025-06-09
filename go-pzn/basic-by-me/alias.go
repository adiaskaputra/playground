package main

import "fmt"

func main() {
	type NoKTP string

	var ktpAdip = "009910241"
	fmt.Println(ktpAdip)

	var ccNumber = 144
	fmt.Println(ccNumber)

	fmt.Println(NoKTP("12345"))
}
