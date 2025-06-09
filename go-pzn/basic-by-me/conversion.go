package main

import "fmt"

func main() {
	int32 := 327768
	int64 := int64(int32)
	int16 := int16(int64)

	fmt.Println("int32", int32)
	fmt.Println("int64", int64)
	fmt.Println("int16", int16)
	fmt.Println()

	name := "Adi Prasetya Putra"
	e := name[0]
	string := string(e)

	fmt.Println("e", e)
	fmt.Println("string", string)
}
