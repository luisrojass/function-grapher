import { readJSON } from './reader.js'
import { FunctionRenderer } from './renderer.js'

const btn = document.querySelector('#uploadJson')
const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

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

renderer.setStyle({
  fontSize: 20
})

btn?.addEventListener('change', async (e) => {
  if (!e.target.files[0]) return
  const json = await readJSON(e.target.files[0])
  const error = renderer.render(json.x, json.y)
  if (!error) document.querySelector('#input-json').style.display = 'none'
})
