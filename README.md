# hexagonal-grid
Javascript code to create hexagonal perspective grid
# Usage
```javascript
var grid = new HexagonGrid(canvasId, ratio, depth, size);
grid.draw();
```

## Description of the properties
 * "canvasId" corresponds to the id of the canvas.
 * "ratio" corresponds to the ratio between the hexagon height and width.
 * "depth" corresponds to the depth of the grid.
 * "width" corresponds to the width of the hexagons in the lowest row.
 
# Usage of the curved hexagonal grid
```javascript
var grid = new HexagonGrid(canvasId, ratio, depth, size);
grid.curvedDraw(sourceX, sourceY, fromAngle, toAngle);
```

## Description of the properties
 * "sourceX" the x-coordinate of the source.
 * "sourceY" the y-coordinate of the source.
 * "fromAngle" the starting angle.
 * "toAngle" the ending angle.

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

## Curved perspective Hexagonal grid

```html
<canvas id="HexCanvas" width="1500" height="500"></canvas>
```

```javascript
var grid = new HexagonGrid("HexCanvas", 1,0.7, 100);
grid.curvedDraw(0, 0, 0, 90);
```

# License

Apache License 2.0
