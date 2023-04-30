export const map = (value, fromMin, fromMax, toMin, toMax) => {
  const normalizedValue = (value - fromMin) / (fromMax - fromMin)
  return ((toMax - toMin) * normalizedValue) + toMin
}

export const getMax = (arr) => {
  let max = arr[0]
  arr.forEach(el => {
    if (el > max) max = el
  })
  return max
}

export const getMin = (arr) => {
  let min = arr[0]
  arr.forEach(el => {
    if (el < min) min = el
  })
  return min
}

export const getDivisions = (min, max, divisions) => {
  const arr = []
  for (let i = min; i <= max; i += (max - min) / divisions) {
    arr.push(i.toFixed(3))
  }
  return arr
}
