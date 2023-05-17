import './style.css'
import { MyEdge } from "./edge.ts"
import { createGraph, GraphType } from "./graphcreate.ts"
import { graphInfoVisualize } from "./graphinfovisualize.ts"
import { graphVisualize } from "./graphvisualize.ts"
import { csvGenerate } from "./csvgenerate.ts"

var nodeMatrix: number[][] = [];
var edgeCoordinates: MyEdge[] = [];
var stationNum: number = 0;

const form = document.getElementById("graph-creation-form") as HTMLFormElement;

form.addEventListener("submit", function(event) {
  event.preventDefault();
  main(event);
})

function receiveInput(event: Event) {
  event.preventDefault(); // フォームのデフォルトの動作を停止する
  
  const maxHeightInput = document.getElementById("max-height") as HTMLInputElement;
  const maxWidthInput = document.getElementById("max-width") as HTMLInputElement;
  const vertexNumInput = document.getElementById("vertex-num") as HTMLInputElement;
  const stationNumInput = document.getElementById("station-num") as HTMLInputElement;
  
  const maxHeight = Number(maxHeightInput.value);
  const maxWidth =  Number(maxWidthInput.value);
  const vertexNum = Number(vertexNumInput.value);
  stationNum = Number(stationNumInput.value);

  if (maxHeight <= 0 || maxWidth <= 0 || vertexNum <= 0 || stationNum < 0) {
    window.alert("値が無効です。縦の長さ・横の長さ・頂点数は 0 より大きい整数を、ゴール数は 0 以上の整数を入力してください。");
  } else if (vertexNum < stationNum) {
    window.alert("頂点数はゴールの数以上である必要があります。")
  } else {  
    readGraphConfig(maxHeight, maxWidth, vertexNum, GraphType.Random);
  }
}


function readGraphConfig(
  maxHeight: number, maxWidth: number, nodeNum: number, graphType: GraphType
  ) {
  [nodeMatrix, edgeCoordinates] = createGraph(maxHeight, maxWidth, nodeNum, graphType);
}

function main(event: Event): void {
  receiveInput(event);
  graphInfoVisualize(nodeMatrix, edgeCoordinates);
  graphVisualize(nodeMatrix, edgeCoordinates);
  csvGenerate(nodeMatrix, edgeCoordinates, stationNum);
}