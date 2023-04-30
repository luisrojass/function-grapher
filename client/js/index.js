import { readJSON } from './reader.js'
import { FunctionRenderer } from './renderer.js'

const btn = document.querySelector('#uploadJson')
const btnLabel = document.querySelector('#input-json')
const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let data = null

const renderer = new FunctionRenderer(canvas)
renderer.setConfig({
  showAxies: true,
  showLine: true,
  showFlags: true,
  showValues: true,
  showBackgroundRects: true,
  roundLimitsOnYAxis: true,
  AxisDivisionsY: 10
})

btn?.addEventListener('change', async (e) => {
  if (!e.target.files[0]) return
  data = await readJSON(e.target.files[0])
  renderer.clear()
  const error = renderer.render(data.x, data.y)
  if (!error) btnLabel.style.top = '4.5rem'
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  renderer.resize(canvas.width, canvas.height)

  if (!data) return
  renderer.clear()
  renderer.render(data.x, data.y)
})
