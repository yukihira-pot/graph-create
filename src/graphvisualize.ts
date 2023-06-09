import { Network, Node } from 'vis-network';
import { Edge as VisEdge } from 'vis-network';
import { MyEdge } from "./edge.ts"

export function graphVisualize(
  nodeMatrix: number[][], edgesList: (MyEdge)[], tileDistance: number
  ): void {
    var nodeMaxIndex: number = 0;
    for (let i = 0; i < nodeMatrix.length; i++) {
        for (let j = 0; j < nodeMatrix[0].length; j++) {
            nodeMaxIndex = Math.max(nodeMaxIndex, nodeMatrix[i][j]);
        }
    }

    // ノードの定義
    var nodes: Node[] = [];
    for (let i = 0; i <= nodeMaxIndex; i++) {
        nodes.push( { id: i, label: i.toString() } );
    }
  
    // エッジの定義
    var edges: VisEdge[] = [];
    for (const edge of edgesList) {
      var v1: number = nodeMatrix[edge.x1][edge.y1];
      var v2: number = nodeMatrix[edge.x2][edge.y2];
      var dist: string = (Math.sqrt(
        (Math.pow(edge.x1 - edge.x2, 2) + Math.pow(edge.y1 - edge.y2, 2))
      ) * tileDistance).toFixed(3);
      edges.push({ from: v1, to: v2, label: dist, smooth: false });
    }
  
    // グラフの定義(ノードとエッジ)
    var data = {
      nodes: nodes,
      edges: edges
    };
    
    var container = (document.getElementById("my-networks") as HTMLDivElement);
    new Network(container, data, {});
  }