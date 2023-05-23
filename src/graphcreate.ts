import './style.css'
import { MyEdge } from "./edge.ts"

export enum GraphType {
  Uniform,
  Tree,
  TreeLike,
  Star,
  StarLike,
  Random
}


export function createGraph(maxHeight: number, maxWidth: number, nodeNum: number, graphType: GraphType): [(number)[][], (MyEdge)[]] {
  const MAX_ELEMENTS: number = 1000000;
  if (maxHeight * maxWidth > MAX_ELEMENTS) {
    throw console.error("exceeded number of elemeents");
  } else if (nodeNum > maxHeight * maxWidth) {
    throw console.error("nodeNum too large");
  }

  var nodeMatrix: (number)[][] = new Array(maxHeight);
  var edgeCoordinates: (MyEdge)[] = [];

  for (let i = 0; i < maxHeight; i++) {
    nodeMatrix[i] = new Array(maxWidth).fill(-1);
  }

  switch (graphType) {
    case null:
      throw console.error("graphType is null");
    case undefined:
      throw console.error("graphType is undefined");
    case GraphType.Uniform:
      break;
    case GraphType.Tree:
      break;
    case GraphType.TreeLike:
      break;
    case GraphType.Star:
      break;
    case GraphType.StarLike:
      break;
    case GraphType.Random:
      [nodeMatrix, edgeCoordinates] = createRandomGraph(maxHeight, maxWidth, nodeNum);
      break;   
    }
    console.log(nodeMatrix, edgeCoordinates);

    return [nodeMatrix, edgeCoordinates];
}

function createRandomGraph(maxHeight: number, maxWidth: number, nodeNum: number): [number[][], MyEdge[]] {
  var nodeMatrix: number[][] = new Array(maxHeight);
  for (let i = 0; i < maxHeight; i++) {
    nodeMatrix[i] = new Array(maxWidth).fill(-1);
  }

  // 全ての格子点の中からランダムに nodeNum 個選ぶ
  var nodeCoordinates: (number)[][] = [];
  for (let i = 0; i < maxHeight; i++) {
    for (let j = 0; j < maxWidth; j++) {
      nodeCoordinates.push([i, j]);
    }
  }
  // 全ての格子点を入れた配列をランダムにソートし、前から nodeNum 個を頂点の座標とする
  for (let i = 0; i < 3; i++) {
    nodeCoordinates.sort((_1, _2) => 0.5 - Math.random());
  }
  nodeCoordinates = nodeCoordinates.slice(0, nodeNum);
  for (let i = 0; i < nodeCoordinates.length; i++) {
    var [x, y] = nodeCoordinates[i];
    nodeMatrix[x][y] = i;
  }
  
  var edgeCoordinates: (MyEdge)[] = [];

  var maxIteration = nodeNum * nodeNum;
  while (maxIteration--) {
    var nodeIndex1 = Math.floor(Math.random() * nodeNum);
    var nodeIndex2 = Math.floor(Math.random() * nodeNum);
    if (nodeIndex1 == nodeIndex2) continue;
    
    var node1: number[] = nodeCoordinates[nodeIndex1];
    var node2: number[] = nodeCoordinates[nodeIndex2];
    var newEdge = new MyEdge(node1[0], node1[1], node2[0], node2[1]);
    var newReverseEdge = new MyEdge(node2[0], node2[1], node1[0], node1[1]);

    if (!edgeCoordinates.some(edge => edge.equals(newEdge)) && !edgeCoordinates.some(edge => edge.equals(newReverseEdge))) {
      var isAbleToAdd: boolean = true;

      // 平面グラフを作るために交差判定
      for (var existingEdge of edgeCoordinates) {
        if (existingEdge.isIntersect(newEdge)) {
          isAbleToAdd = false;
          break;
        }
      }
      // ある頂点が辺上 (両端含まない) にないか判定
      for (const nodeCoordinate of nodeCoordinates) {
        const [x, y] = nodeCoordinate;
        if (newEdge.isPointOnEdge(x, y)) {
          // console.log(`is on point: ${x}, ${y} on [${newEdge}]`);
          isAbleToAdd = false;
          break;
        }
      }

      if (isAbleToAdd) {
        edgeCoordinates.push(newEdge);
      }
    }
  }

  return [nodeMatrix, edgeCoordinates];
}
