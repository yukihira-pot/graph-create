import { MyEdge } from "./edge.ts"

export function graphInfoVisualize(
    adjacencyMatrix: number[][], edgeCoordinates: MyEdge[]
): void {
    (document.getElementById("adjacency-matrix") as HTMLDivElement).innerText = adjacencyMatrix.toString();
    (document.getElementById("edge-coordinates") as HTMLDivElement).innerText = edgeCoordinates.toString();
}