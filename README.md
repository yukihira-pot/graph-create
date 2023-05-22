# graph-create
## URL
- [https://yukihira-pot.github.io/graph-create/](https://yukihira-pot.github.io/graph-create/) にデプロイしています。

## Contents
- 2次元の盤面にランダムに頂点を配置し、ランダムに辺を張って平面的グラフを作成するツールです。作成したグラフの頂点や辺の情報は、CSV ファイルとしてダウンロードすることができます。

## Usage
1. 生成フォームに各種の数値を入れ、生成ボタンを押します。ダウンロードリンクをクリックすると、CSV ファイルがダウンロードされます。
![画像1](readme_images/graph_create_feature1.png)
2. 生成したグラフはビジュアライズされます。
![画像2](readme_images/graph_create_feature2.png)

## To Do
- ランダムなグラフだけでなく、頂点位置や辺の張り方をある程度指定できるようにします。
  - 木 ($n$ 頂点 $n-1$ 辺) に近いグラフ
    - スターグラフに近いグラフ
  - 碁盤目状のグラフ
- 複数のグラフを作成し、その情報をまとめてダウンロードできるようにします。