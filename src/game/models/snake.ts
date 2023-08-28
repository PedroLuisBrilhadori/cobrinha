import { Color, Direction, Action } from "../types";
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
  size: number = 10;

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
    const action = this.controller.action;
    this.last = { x: this.x, y: this.y };

    if (action) return this.runAction(action);

    if (direction === "stop") return;

    this.move(direction);
  }

  draw() {
    this.context.clearRect(this.last.x, this.last.y, this.size, this.size);
    this.context.fillRect(this.x, this.y, this.size, this.size);
  }

  private runAction(action: Action) {
    if (action) {
      this.reset();
      this.controller.clearAction();

      return;
    }
  }

  private isPossible() {
    const width = this.canvas.width;
    const heigth = this.canvas.height;

    if (!this.alive) return false;

    if (
      this.y < heigth - this.size &&
      this.x < width - this.size &&
      this.y > -1 &&
      this.x > -1
    )
      return true;

    this.alive = false;

    return false;
  }

  private reset() {
    this.x = 0;
    this.y = 0;
    this.alive = true;
    this.speed = 1;
  }

  private move(direction: Direction) {
    if (!this.isPossible()) {
      if (!this.alive) return this.reset();
    }

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
