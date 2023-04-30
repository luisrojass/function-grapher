import { readFileSync } from 'fs'

const __path = '/home/aquagd/Documents/programming/js/practices/bioquim/function-grapher/'
const fileName = 'exampleData.json'

const data = readFileSync(__path + fileName, { encoding: 'utf-8' })
const { x, y } = JSON.parse(data)

// Find the max value of an array and returns its index
const findMaxIndex = (arr) => {
  let max = arr[0]
  let index = 0

  arr.forEach((el, i) => {
    if (el > max) {
      max = el
      index = i
    }
  })

  return index
}

const maxIndex = findMaxIndex(y)

console.table({
  'Longitud de onda (nm)': x[maxIndex],
  'Absorbancia máxima': y[maxIndex]
})
