import { MyEdge } from "./edge.ts"

interface JsonData {
  [key: string]: string | number | boolean | null | undefined;
}

function jsonToCSV(json: JsonData[], header: string): string {
  const body = json.map((d) => Object.keys(d).map((key) => d[key]).join(', ')).join("\n");
  return header + body;
}



export function csvGenerate(nodeMatrix: number[][], edgeCoordinates: (MyEdge)[], stationNum: number): void {

  type Node = { 
    ID: string, 
    x: string, 
    y: string, 
    z: string, 
    station: string 
  };
  type Edge = {
    from: string, 
    to: string
  };

  var nodes: Node[] = [];
  var edges: Edge[] = [];

  var maxNodeIndex = 0;
  for (let i = 0; i < nodeMatrix.length; i++) {
    for (let j = 0; j < nodeMatrix.length; j++) {
      maxNodeIndex = Math.max(maxNodeIndex, nodeMatrix[i][j]);
    }
  }

  var possibleStations: (number)[] = [];
  for (let i = 0; i <= maxNodeIndex; i++) {
    possibleStations.push(i);
  }
  possibleStations.sort((_1, _2) => 0.5 - Math.random());
  var stations: (number)[] = possibleStations.slice(0, stationNum);

  for (let i = 0; i < nodeMatrix.length; i++) {
    for (let j = 0; j < nodeMatrix[0].length; j++) {
      var isStation: number = 0;
      if (stations.some( value => value == nodeMatrix[i][j] )) {
        isStation = 1;
      }
      if (nodeMatrix[i][j] != -1) {
        nodes.push({
          ID: nodeMatrix[i][j].toString(),
          x: i.toString(),
          y: j.toString(),
          z: String(0),
          station: isStation.toString()
        });
      }
    }
  }

  for (const edge of edgeCoordinates) {
    edges.push({
      from: nodeMatrix[edge.x1][edge.y1].toString(),
      to: nodeMatrix[edge.x2][edge.y2].toString()
    });
  }

  var nodeCSV: string =  jsonToCSV(nodes, ["ID(ignored)", "x", "y", "z", "station\n"].join(","));
  var edgeCSV: string = jsonToCSV(edges, ["from", "to\n"].join(","));

  console.log(nodeCSV);
  console.log(edgeCSV);
}