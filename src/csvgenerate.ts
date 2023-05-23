import JSZip from 'jszip';
import { MyEdge } from "./edge.ts"

function getCurrentDateTimeStr(): string{
  const date = new Date()
  const Y = date.getFullYear()
  const M = ("00" + (date.getMonth()+1)).slice(-2)
  const D = ("00" + date.getDate()).slice(-2)
  const h = ("00" + date.getHours()).slice(-2)
  const m = ("00" + date.getMinutes()).slice(-2)
  const s = ("00" + date.getSeconds()).slice(-2)

  return `${Y}${M}${D}_${h}${m}${s}`;
}

interface JsonData {
  [key: string]: string | number | boolean | null | undefined;
}

function jsonToCSV(json: JsonData[], header: string): string {
  const body = json.map((d) => Object.keys(d).map((key) => d[key]).join(', ')).join("\n");
  return header + body;
}

export async function createDownloadLink(nodeCSVList: string[], edgeCSVList: string[]): Promise<void> {
  const zip = new JSZip();
  
  for (let i = 0; i < nodeCSVList.length; i++) {
    const folder = zip.folder(`map_${i}`);
    folder?.file("node.csv", nodeCSVList[i]);
    folder?.file("edge.csv", edgeCSVList[i]);
  }
  
  const content = await zip.generateAsync({ type: "blob" });

  // ダウンロードリンクを生成する
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(content);
  downloadLink.download = `map_${getCurrentDateTimeStr()}`;
  downloadLink.innerText = `map_${getCurrentDateTimeStr()}.zip`;

  const li = document.createElement("li");
  li.appendChild(downloadLink);
  (document.getElementById("download-csv") as HTMLUListElement).appendChild(li);
}

export function csvGenerate(
  nodeMatrix: number[][], edgeCoordinates: (MyEdge)[], tileDistance: number, stationNum: number
  ): string[] {

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

  // nodes に値を追加
  for (let i = 0; i < nodeMatrix.length; i++) {
    for (let j = 0; j < nodeMatrix[0].length; j++) {
      var isStation: number = 0;
      if (stations.some( value => (value == nodeMatrix[i][j]) )) {
        isStation = 1;
      }
      if (nodeMatrix[i][j] != -1) {
        nodes.push({
          ID: nodeMatrix[i][j].toString(),
          x: (i * tileDistance).toString(),
          y: (j * tileDistance).toString(),
          z: String(0 * tileDistance),
          station: isStation.toString()
        });
      }
    }
  }
  
  // ノードを ID でソート
  nodes.sort((a, b) => parseInt(a.ID) - parseInt(b.ID));

  // edges に値を追加
  for (const edge of edgeCoordinates) {
    edges.push({
      from: nodeMatrix[edge.x1][edge.y1].toString(),
      to: nodeMatrix[edge.x2][edge.y2].toString()
    });
  }

  var nodeCSV: string =  jsonToCSV(nodes, ["ID(ignored)", "x", "y", "z", "station\n"].join(","));
  var edgeCSV: string = jsonToCSV(edges, ["from", "to\n"].join(","));

  return [nodeCSV, edgeCSV];
}