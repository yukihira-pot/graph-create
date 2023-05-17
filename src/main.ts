import './style.css'
import { MyEdge } from "./edge.ts"
import { createGraph, GraphType } from "./graphcreate.ts"
import { graphInfoVisualize } from "./graphinfovisualize.ts"
import { graphVisualize } from "./graphvisualize.ts"

var adjacencyMatrix: number[][] = [];
var edgeCoordinates: MyEdge[] = [];

function readGraphConfig(
  maxHeight: number, maxWidth: number, nodeNum: number, graphType: GraphType
) {
  [adjacencyMatrix, edgeCoordinates] = createGraph(maxHeight, maxWidth, nodeNum, graphType);
}

readGraphConfig(10, 10, 10, GraphType.Random);

graphInfoVisualize(adjacencyMatrix, edgeCoordinates);
graphVisualize(adjacencyMatrix, edgeCoordinates);