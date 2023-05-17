import { MyEdge } from "./edge.ts"

export function graphInfoVisualize(
  adjacencyMatrix: number[][], edgeCoordinates: MyEdge[]
): void {
  for (let i = 0; i < adjacencyMatrix.length; i++) {
    const tr_empty = document.createElement("tr");
    (document.getElementById("adjacency-matrix__table") as HTMLDivElement).appendChild(tr_empty);
    for (let j = 0; j < adjacencyMatrix[0].length; j++) {
      const tr = (document.getElementsByTagName("tr")[i] as HTMLTableRowElement);
      const td = document.createElement("td");
      if (adjacencyMatrix[i][j] != -1) {
        td.textContent = adjacencyMatrix[i][j].toString();
      } else {
        td.textContent = "-";
      }
      tr.appendChild(td);
    }
  }
  var edgeElements = (document.getElementById("edge-coordinates") as HTMLDivElement);
  for (let i = 0; i < edgeCoordinates.length; i++) {
    var x1 = edgeCoordinates[i].x1;
    var y1 = edgeCoordinates[i].y1;
    var x2 = edgeCoordinates[i].x2;
    var y2 = edgeCoordinates[i].y2;
    var v1 = adjacencyMatrix[x1][y1];
    var v2 = adjacencyMatrix[x2][y2];
    var edgeElement = document.createElement("li");
    edgeElement.innerText 
    = `${v1}-${v2}:(${x1},${y1})-(${x2},${y2})`;
    edgeElements.appendChild(edgeElement);
  }
}