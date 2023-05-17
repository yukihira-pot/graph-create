import './style.css'
import { createGraph, GraphType } from "./graphcreate.ts"

function graphCreate(maxHeight: number, maxWidth: number, nodeNum: number, graphType: GraphType) {
  const [adjacencyMatrix, edgeCoordinates] = createGraph(maxHeight, maxWidth, nodeNum, graphType);
  (document.getElementById("adjacency-matrix") as HTMLDivElement).innerText = adjacencyMatrix.toString();
  (document.getElementById("edge-coordinates") as HTMLDivElement).innerText = edgeCoordinates.toString();
}

graphCreate(5, 5, 5, GraphType.Random);