package main

import (
	"fmt"
	"strconv"
)

func printText(n int) string {
	return "Hello World " + strconv.Itoa(n)
}

func main() {
	for i := 1; i <= 10; i++ {
		if i == 5 {
			continue
		}
		name := printText(i)
		fmt.Println(name)
	}
}
