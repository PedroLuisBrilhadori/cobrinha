import { Color, Direction, Action } from "../types";
import { Controller } from "./controller";
import { GameInfo } from "./game-info";

export type CreateSnake = {
  color: Color;
  controller: Controller;
  gameInfo: GameInfo;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
};

export class Snake {
  alive: boolean = true;
  x: number = 10;
  y: number = 10;
  direction: Direction = "stop";
  speed: number = 1;
  color: Color;
  size: number = 10;

  private last: { x: number; y: number } = { x: 0, y: 0 };
  private controller: Controller;
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private gameInfo: GameInfo;

  constructor({ color, controller, context, canvas, gameInfo }: CreateSnake) {
    this.color = color;
    this.gameInfo = gameInfo;
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
    const width = this.canvas.width + 5;
    const heigth = this.canvas.height + 5;

    if (
      this.x < -1 ||
      this.x + this.size > width ||
      this.y < -1 ||
      this.y + this.size > heigth
    )
      return false;

    return true;
  }

  private reset() {
    this.x = 0;
    this.y = 0;
    this.alive = true;
    this.speed = 1;
    this.controller.clearAction();
    this.gameInfo.addAtempt();
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
