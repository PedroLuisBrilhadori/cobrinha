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

  init() {
    this.setRandomPosition();
    this.gameInfo.loadingComplete();
  }

  update() {
    const direction = this.controller.getDirection();
    const action = this.controller.action;

    if (action) return this.runAction(action);

    if (direction === "stop") return;

    this.move(direction);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillRect(this.x, this.y, this.size, this.size);
  }

  private setRandomPosition() {
    const padding = this.size * 2;
    const width = this.canvas.width - padding;
    const height = this.canvas.height - padding;

    this.x = Math.random() * (width - padding) + padding;
    this.y = Math.random() * (height - padding) + padding;
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
    this.setRandomPosition();
    this.alive = true;
    this.speed = 1;
    this.controller.clearAction();
    this.gameInfo.addAtempt();
  }

  private move(direction: Direction) {
    if (!this.isPossible()) return;

    const actions: { [key in Direction]: VoidFunction } = {
      up: () => {
        this.y -= this.speed;
      },
      down: () => {
        this.y += this.speed;
      },
      right: () => {
        this.x += this.speed;
      },

      left: () => {
        this.x -= this.speed;
      },
      stop: () => {},
    };

    actions[direction]();
  }
}
