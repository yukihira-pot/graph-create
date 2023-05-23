import './style.css'
import { MyEdge } from "./edge.ts"
import { createGraph, GraphType } from "./graphcreate.ts"
import { graphInfoVisualize } from "./graphinfovisualize.ts"
import { graphVisualize } from "./graphvisualize.ts"
import { createDownloadLink, csvGenerate } from "./csvgenerate.ts"

var nodeMatrix: number[][] = [];
var edgeCoordinates: MyEdge[] = [];
var stationNum: number = 0;
var tileDistance: number = 0;
var generateGraphNum: number = 0;

const form = document.getElementById("graph-creation-form") as HTMLFormElement;

form.addEventListener("submit", function(event) {
  event.preventDefault();
  main(event);
})

function generateGraph(event: Event) {
  event.preventDefault(); // フォームのデフォルトの動作を停止する
  
  const maxHeightInput = document.getElementById("max-height") as HTMLInputElement;
  const maxWidthInput = document.getElementById("max-width") as HTMLInputElement;
  const vertexNumInput = document.getElementById("vertex-num") as HTMLInputElement;
  const stationNumInput = document.getElementById("station-num") as HTMLInputElement;
  const tileDistanceInput = document.getElementById("tile-distance") as HTMLInputElement;
  const generateGraphNumInput = document.getElementById("generate-graph-num") as HTMLInputElement;
  
  const maxHeight = Number(maxHeightInput.value);
  const maxWidth =  Number(maxWidthInput.value);
  const vertexNum = Number(vertexNumInput.value);
  stationNum = Number(stationNumInput.value);
  tileDistance = Number(tileDistanceInput.value);
  generateGraphNum = Number(generateGraphNumInput.value);

  if (maxHeight <= 0 || maxWidth <= 0 || vertexNum <= 0 || stationNum < 0) {
    window.alert("値が無効です。縦の長さ・横の長さ・頂点数は 0 より大きい整数を、ゴール数は 0 以上の整数を入力してください。");
  } else if (vertexNum < stationNum) {
    window.alert("頂点数はゴールの数以上である必要があります。");
  } else if (tileDistance <= 0) {
    window.alert("1マスあたりの距離は正の数である必要があります。");
  } else if (generateGraphNum <= 0) {
    window.alert("生成するグラフの数は正の数である必要があります。");
  } else {  
    generateGraphImpl(maxHeight, maxWidth, vertexNum, stationNum, tileDistance, generateGraphNum, GraphType.Random);
  }
}

function generateGraphImpl(
  maxHeight: number, maxWidth: number, 
  vertexNum: number, stationNum: number, tileDistance: number, 
  generateGraphNum: number, graphType: GraphType 
) {

  var nodeCSVList: string[] = [], edgeCSVList: string[] = [];
  for (let i = 0; i < generateGraphNum; i++) {
    [nodeMatrix, edgeCoordinates] = createGraph(maxHeight, maxWidth, vertexNum, graphType);
    if (i == generateGraphNum - 1) {
      graphInfoVisualize(nodeMatrix, edgeCoordinates, tileDistance);
      graphVisualize(nodeMatrix, edgeCoordinates, tileDistance);
    }
    var [nodeCSV, edgeCSV] = csvGenerate(nodeMatrix, edgeCoordinates, tileDistance, stationNum);
    edgeCSVList.push(edgeCSV);
    nodeCSVList.push(nodeCSV);
  }
  createDownloadLink(nodeCSVList, edgeCSVList);
}

function main(event: Event): void {
  generateGraph(event);
}