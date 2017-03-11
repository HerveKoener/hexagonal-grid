# hexagonal-grid
Javascript code to create hexagonal perspective grid
# Usage
let grid = new HexagonGrid("HexCanvas", 2.5, 0.1, 50);
grid.draw();

"HexCanvas" corresponds to the id of the canvas.
2.5 corresponds to the ratio between the hexagon height and width. In this case the width is 50px abd the height: 25px.
0.1 corresponds to the depth of the grid.
50 corresponds to the width of the hexagons in the lowest row.