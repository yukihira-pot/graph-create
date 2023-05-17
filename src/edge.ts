export class MyEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(x1_: number, y1_: number, x2_: number, y2_: number) {
    this.x1 = x1_;
    this.y1 = y1_;
    this.x2 = x2_;
    this.y2 = y2_;
  }

  // 辺の交差判定
  isIntersect(anotherEdge: MyEdge): boolean {
    // https://qiita.com/zu_rin/items/e04fdec4e3dec6072104 より
    var s: number = (this.x1 - this.x2) * (anotherEdge.y1 - this.y1) - (this.y1 - this.y2) * (anotherEdge.x1 - this.x1);
    var t: number = (this.x1 - this.x2) * (anotherEdge.y2 - this.y1) - (this.y1 - this.y2) * (anotherEdge.x2 - this.x1);
    if (s * t >= 0)
      return false;

    s = (anotherEdge.x1 - anotherEdge.x2) * (this.y1 - anotherEdge.y1) - (anotherEdge.y1 - anotherEdge.y2) * (this.x1 - anotherEdge.x1);
    t = (anotherEdge.x1 - anotherEdge.x2) * (this.y2 - anotherEdge.y1) - (anotherEdge.y1 - anotherEdge.y2) * (this.x2 - anotherEdge.x1);
    if (s * t >= 0)
      return false;
    return true;
  }

  // (x, y) がその辺上 (両端含まない) にあるか判定
  isPointOnEdge(x: number, y: number): boolean {
    // x 座標が同じとき
    if ((this.x1 == x && x == this.x2) && (this.y1 < y && y < this.y2) || (this.y2 < y && y < this.y1)) {
      return true;
    }
    // y 座標が同じとき
    if ((this.y1 == y && y == this.y2) && (this.x1 < x && x < this.x2) || (this.x2 < x && x < this.x1)) {
      return true;
    }
    // x 座標も y 座標も違うとき
    if ((this.x1 < x && x < this.x2) || (this.x2 < x && x < this.x1)) {
      if ((this.y1 < y && y < this.y2) || (this.y2 < y && y < this.y1)) {
        if ((this.y1 - this.y2) * (x - this.x1) == (y - this.y1) * (this.x1 - this.x2)) {
          return true;
        }
      }
    }
    return false;
  }

  toString() {
    return `[${this.x1}, ${this.y1}] -> [${this.x2}, ${this.y2}]\n`;
  }

  equals(anotherEdge: MyEdge) {
    return this.x1 === anotherEdge.x1 && this.x2 === anotherEdge.x2 && this.y1 === anotherEdge.y1 && this.y2 === anotherEdge.y2;
  }
}