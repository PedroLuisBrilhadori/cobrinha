import { Color, Direction } from "../types";
import { Controller } from "./controller";

export type CreateSnake = {
  color: Color;
  controller: Controller;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
};

export class Snake {
  alive: boolean = true;
  x: number = 0;
  y: number = 0;
  direction: Direction = "stop";
  speed: number = 1;
  color: Color;

  private last: { x: number; y: number } = { x: 0, y: 0 };
  private controller: Controller;
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor({ color, controller, context, canvas }: CreateSnake) {
    this.color = color;
    this.controller = controller;
    this.context = context;
    this.canvas = canvas;
  }

  update() {
    const direction = this.controller.getDirection();

    if (direction === "stop") return;

    this.last = { x: this.x, y: this.y };
    this.move(direction);
  }

  draw() {
    this.context.clearRect(this.last.x, this.last.y, 1, 1);
    this.context.fillRect(this.x, this.y, 1, 1);
  }

  private isPossible() {
    const width = this.canvas.width;
    const heigth = this.canvas.height;

    if (this.y < heigth && this.x < width) return true;

    return false;
  }

  private move(direction: Direction) {
    if (!this.isPossible()) return;

    switch (direction) {
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      default:
        break;
    }
  }
}
