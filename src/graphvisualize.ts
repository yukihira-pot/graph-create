import { Network, Node } from 'vis-network';
import { Edge as VisEdge } from 'vis-network';
import { MyEdge } from "./edge.ts"

export function graphVisualize(adjancencyMatrix: number[][], edgesList: (MyEdge)[]): void {
    var nodeMaxIndex: number = 0;
    for (let i = 0; i < adjancencyMatrix.length; i++) {
        for (let j = 0; j < adjancencyMatrix[0].length; j++) {
            nodeMaxIndex = Math.max(nodeMaxIndex, adjancencyMatrix[i][j]);
        }
    }

    // ノードの定義
    var nodes: Node[] = [];

    for (let i = 0; i <= nodeMaxIndex; i++) {
        nodes.push( { id: i, label: i.toString() } );
    }
  
    // エッジの定義
    // var edges: Edge[] = [
    //   {from: 1, to: 2, id: 1},
    // ];
    var edges: VisEdge[] = [];
    for (const edge of edgesList) {
      var v1: number = adjancencyMatrix[edge.x1][edge.y1];
      var v2: number = adjancencyMatrix[edge.x2][edge.y2];
      var dist: string = Math.sqrt(
        Math.pow(edge.x1 - edge.x2, 2) + Math.pow(edge.y1 - edge.y2, 2)
      ).toFixed(3);
      edges.push({ from: v1, to: v2, label: dist });
    }
  
    // グラフの定義(ノードとエッジ)
    var data = {
      nodes: nodes,
      edges: edges
    };
  
    console.log(data);
    
  
    var container = (document.getElementById("my-networks") as HTMLDivElement);
    var network = new Network(container, data, {});
  }