import { map, getMax, getMin, getDivisions } from './math.js'

export class FunctionRenderer {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.config = {
			showAxies: true,
			showLines: true,
			showFlags: false,
			showValues: false,
			showBackgroundRects: false,
			roundLimitsOnYAxis: false,
			AxisDivisionsY: 10
		}
		this.styles = {
			backgroundColor: '#080812',
			backgroundRectsColor: '#333',
			font: '16px Arial',
			lineColor: '#bbb',
			lineWidth: 2,
			fillColor: '#bbb'
		}
	}

	setConfig({
		showAxies = true,
		showLines = true,
		showFlags = false,
		showValues = false,
		showBackgroundRects = false,
		roundLimitsOnYAxis = false,
		AxisDivisionsY = 10
	}) {
		this.config = {
			showAxies,
			showLines,
			showFlags,
			showValues,
			showBackgroundRects,
			roundLimitsOnYAxis,
			AxisDivisionsY
		}
	}

	setStyle({
		backgroundColor = '#080812',
		backgroundRectsColor = '#333',
		fontSize = 16,
		fontFamily = 'Arial',
		lineColor = '#bbb',
		lineWidth = 2,
		fillColor = '#bbb'
	}) {
		this.styles = {
			backgroundColor,
			backgroundRectsColor,
			font: `${fontSize}px ${fontFamily}`,
			lineColor,
			lineWidth,
			fillColor
		}

		// Set a background color to canvas
		this.ctx.fillStyle = backgroundColor !== 'transparent'
			? backgroundColor
			: '#0000'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}

	resize(width, height) {
		this.canvas.width = width
		this.canvas.height = height
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	render(arrX, arrY) {
		try {
			if (arrX.length === undefined || arrY.length === undefined) {
				console.log("There's no arrX or arrY")
			}
			if (arrX.length !== arrY.length) {
				console.log('Arrays must have the same length')
			}
		} catch (err) {
			console.log(err)
			return true
		}

		// Set margins
		const startWidth = canvas.width * 0.05
		const startHeight = canvas.height * 0.05
		const endWidth = canvas.width * 0.95
		const endHeight = canvas.height * 0.95

		// Get axies limits
		const minX = getMin(arrX)
		const maxX = getMax(arrX)
		const minY = this.config.roundLimitsOnYAxis
			? Math.floor(getMin(arrY))
			: getMin(arrY)
		const maxY = this.config.roundLimitsOnYAxis
			? Math.ceil(getMax(arrY))
			: getMax(arrY)

		// Set styles
		this.ctx.fillStyle = this.styles.fillColor
		this.ctx.lineWidth = this.styles.lineWidth
		this.ctx.strokeStyle = this.styles.lineColor
		this.ctx.font = this.styles.font
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'

		// Render Y axis
		if (this.config.showAxies) {
			const yAxis = getDivisions(minY, maxY, this.config.AxisDivisionsY)
			const minYAxis = getMin(yAxis)
			const maxYAxis = getMax(yAxis)
			const decimals = maxYAxis > 100
				? 0 : maxYAxis > 10
					? 1 : maxYAxis > 1
						? 2 : 3
			console.log(yAxis.length)

			yAxis.forEach(el => {
				// Render Y axis numbers
				this.ctx.beginPath()
				this.ctx.fillText(
					parseFloat(el).toFixed(decimals),
					startWidth / 2,
					map(el, minYAxis, maxYAxis, endHeight, startHeight)
				)
				this.ctx.closePath()

				// Render line axis y
				if (this.config.showBackgroundRects) {
					// Set styles
					this.ctx.lineWidth = 1
					this.ctx.strokeStyle = this.styles.backgroundRectsColor
					// Render
					this.ctx.beginPath()
					this.ctx.moveTo(
						startWidth,
						map(el, minYAxis, maxYAxis, endHeight, startHeight)
					)
					this.ctx.lineTo(
						endWidth,
						map(el, minYAxis, maxYAxis, endHeight, startHeight)
					)
					this.ctx.stroke()
					this.ctx.closePath()
				}

				// Resetting styles
				this.ctx.lineWidth = this.styles.lineWidth
				this.ctx.strokeStyle = this.styles.lineColor

				for (let i = 0; i < arrX.length; i++) {
					// Render X axis
					if (this.config.showAxies) {
						this.ctx.beginPath()
						this.ctx.fillText(
							arrX[i].toString(),
							map(arrX[i], minX, maxX, startWidth, endWidth),
							endHeight + ((canvas.height - endHeight) / 2)
						)
						this.ctx.closePath()
					}

					// Render lines between flags
					if (this.config.showLines) {
						this.ctx.beginPath()
						this.ctx.moveTo(
							map(arrX[i], minX, maxX, startWidth, endWidth),
							map(arrY[i], minY, maxY, endHeight, startHeight)
						)
						this.ctx.lineTo(
							map(arrX[i + 1], minX, maxX, startWidth, endWidth),
							map(arrY[i + 1], minY, maxY, endHeight, startHeight)
						)
						this.ctx.stroke()
						this.ctx.closePath()
					}

					// Render flags
					if (this.config.showFlags) {
						this.ctx.beginPath()
						this.ctx.arc(
							map(arrX[i], minX, maxX, startWidth, endWidth),
							map(arrY[i], minY, maxY, endHeight, startHeight),
							6, 0, Math.PI * 2)
						this.ctx.fill()
						this.ctx.closePath()
					}

					// Render values on flags
					if (this.config.showValues) {
						this.ctx.beginPath()
						this.ctx.fillText(
							arrY[i].toString(),
							map(arrX[i], minX, maxX, startWidth, endWidth),
							map(arrY[i], minY, maxY, endHeight, startHeight) - (this.styles.font.slice(0, 2) * 1.5)
						)
						this.ctx.closePath()
					}
				}
			})
		}

		return false
	}
}
