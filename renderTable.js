import { readFileSync } from 'fs'

const __path = '/home/aquagd/Documents/programming/js/practices/bioquim/function-grapher/'
const fileName = 'exampleData.json'

const data = readFileSync(__path + fileName, { encoding: 'utf-8' })
const json = JSON.parse(data)

const divideArray = (arr, divs) => {
  const arrays = []
  let count = 1

  for (let i = 0; i < divs; i++) {
    const _arr = []
    for (
      let j = Math.floor(arr.length / divs) * (count - 1);
      j < Math.floor(arr.length / divs) * count;
      j++
    ) {
      _arr.push(arr[j])
    }
    arrays.push(_arr)
    count++
  }
  return arrays
}
const arrsX = divideArray(json.x, 3)
const arrsY = divideArray(json.y, 3)

for (let i = 0; i < 3; i++) {
  const data = {
    'Longitud de onda (nm)': arrsX[i],
    'Absorbancia': arrsY[i]
  }
  console.table(data)
}
