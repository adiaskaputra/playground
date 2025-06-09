interface IPoint {
  x: number,
  y: number
}
let pointer: IPoint = { x: 10, y: 10 }

function printCoord(pt: IPoint) {
  console.log(pt.x, pt.y)
}

export { }
