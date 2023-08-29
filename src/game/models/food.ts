import { Map, Object, Position } from "..";
import { GameInfo } from "./game-info";

export type CreateFood = {
  gameInfo: GameInfo;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  seconds: number;
  map: Map;
};

export class Food {
  private startPosition: Position = { x: 0, y: 0 };
  private x: number = this.startPosition.x;
  private y: number = this.startPosition.y;
  private last: Position = this.startPosition;
  private size: number = 11;

  private loading: boolean = false;
  private alive: boolean = false;

  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private time: number = 5000;
  private map: Map;

  constructor({ context, canvas, seconds, map }: CreateFood) {
    this.context = context;
    this.canvas = canvas;
    this.map = map;

    this.time = seconds * 1000;
    this.map.registerObject(this.getObject());
  }

  update() {
    if (this.alive) return;
    if (this.loading) return;

    this.loading = true;

    setTimeout(() => {
      this.randomPosition();
      this.map.updateObject(this.getObject());
      this.alive = true;
      this.loading = false;
    }, this.time);
  }

  draw() {
    if (this.loading) return;

    const oldColor = this.context.fillStyle;

    this.context.clearRect(this.last.x, this.last.y, this.size, this.size);
    this.context.fillStyle = "red";
    this.context.fillRect(this.x, this.y, this.size, this.size);

    this.context.fillStyle = oldColor;
  }

  private getObject(): Object {
    return {
      name: "food",
      x: this.x,
      y: this.y,
      size: this.size,
    };
  }

  private randomPosition() {
    const width = this.canvas.width + 5;
    const heigth = this.canvas.height + 5;

    const randomX = Math.floor(Math.random() * (width / this.size)) * this.size;
    const randomY =
      Math.floor(Math.random() * (heigth / this.size)) * this.size;

    this.x = randomX;
    this.y = randomY;
  }
}
