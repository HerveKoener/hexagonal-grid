# hexagonal-grid
Javascript code to create hexagonal perspective grid
# Usage
```javascript
var grid = new HexagonGrid(canvasId, ratio, depth, size);
grid.draw();
```

## Description of the properties
 * "canvasId" corresponds to the id of the canvas.
 * "ratio" corresponds to the ratio between the hexagon height and width. In this case the width is 50px abd the height: 25px.
 * "depth" corresponds to the depth of the grid.
 * "width" corresponds to the width of the hexagons in the lowest row.

# Examples

## Flat Hexagonal grid

```html
<canvas id="HexCanvas" width="1500" height="500"></canvas>
```

```javascript
var grid = new HexagonGrid('HexCanvas', 1, 0, 100);
grid.draw();
```

## Perspective Hexagonal grid

```html
<canvas id="HexCanvas" width="1500" height="500"></canvas>
```

```javascript
var grid = new HexagonGrid("HexCanvas", 2.5, 0.1, 50);
grid.draw();
```

# License

MIT