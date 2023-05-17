import { MyEdge } from "./edge.ts"

export function graphInfoVisualize(
  nodeMatrix: number[][], edgeCoordinates: MyEdge[]
): void {
  // 前の table を空にする
  const table = document.getElementById("node-matrix__table") as HTMLTableElement;
  table.innerHTML = "";
  // table を頂点位置の 2 次元配列で埋めていく
  for (let i = 0; i < nodeMatrix.length + 1; i++) {
    const tr_empty = document.createElement("tr");
    (document.getElementById("node-matrix__table") as HTMLDivElement).appendChild(tr_empty);
    for (let j = 0; j < nodeMatrix[0].length; j++) {
      const tr = (document.getElementsByTagName("tr")[i] as HTMLTableRowElement);
      if (i == 0) { // 見出しを作る
        const th = document.createElement("th");
        if (j > 0) {
          th.textContent = (j - 1).toString();
        }
        tr.appendChild(th);
      } else if (j == 0) {
        const th = document.createElement("th");
        th.textContent = (i - 1).toString();
        tr.appendChild(th);
      } else {
        const td = document.createElement("td");
        if (nodeMatrix[i - 1][j] != -1) {
          td.textContent = nodeMatrix[i - 1][j].toString();
        } else {
          td.textContent = "-";
        }
        tr.appendChild(td);
      }
    }
  }
  var edgeElements = (document.getElementById("edge-coordinates") as HTMLDivElement);
  for (let i = 0; i < edgeCoordinates.length; i++) {
    var x1 = edgeCoordinates[i].x1;
    var y1 = edgeCoordinates[i].y1;
    var x2 = edgeCoordinates[i].x2;
    var y2 = edgeCoordinates[i].y2;
    var v1 = nodeMatrix[x1][y1];
    var v2 = nodeMatrix[x2][y2];
    var edgeElement = document.createElement("li");
    edgeElement.innerText 
    = `${v1} - ${v2}: (${x1}, ${y1}) - (${x2}, ${y2})`;
    edgeElements.appendChild(edgeElement);
  }
}