![][banner-img]

Web app to graph number list from a json file.

## Quick start
You can try this app [here][deploy-app-link]

You need to provide a json file following this example:
```
  {
    "x": [1, 2, 3],
    "y": [1, 4, 9]
  }
```

## Installation
First, import this project with `git clone`:
```
$ git clone https://github.com/luisrojass/function-grapher.git
```

Or, if you prefer, download the zip file and unzip it.

Go to client directory:
```
$ cd client
```

Here, in `/js/renderer.js` contains the `FunctionRenderer` class that you can import to another file, don't forget that this file needs `/js/math.js`.

## Features
`FunctionRenderer` class provides customizations for config:
  * showAxies
  * showLines
  * showFlags
  * showValues
  * showBackgroundRects
  * roundLimitsOnYAxis
  * AxisDivisionsY

And for styles:
  * backgroundColor
  * backgroundRectsColor
  * font
  * lineColor
  * lineWidth
  * fillColor

You can graph more than one function in the same canvas, calling `FunctionRenderer.render()` with other lists setting other config and styles for every graph.

## Contributing
  * You can open a issue to ask new funcionalities or report bugs [here][issue-link].
  * You can clone this repository and do a pull request [here][pullrequest-link].

## License
**MIT license:**
Copyright (c) 2023 Luis Rojas

[MIT License][license-link]

[banner-img]: https://res.cloudinary.com/dda2colxy/image/upload/v1682882070/github/readmes/function-grapher/github-function-grapher-banner_lvqnc5.png

[deploy-app-link]: https://function-grapher.netlify.app

[issue-link]: https://github.com/luisrojass/function-grapher/issues

[pullrequest-link]: https://github.com/luisrojass/function-grapher/pulls

[license-link]: https://github.com/luisrojass/function-grapher/blob/main/LICENSE