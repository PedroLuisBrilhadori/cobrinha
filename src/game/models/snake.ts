import { Color, Direction, Action, Position } from "../types";
import { Controller } from "./controller";
import { GameInfo } from "./game-info";
import { Map } from "./map";

export type CreateSnake = {
  color: Color;
  controller: Controller;
  gameInfo: GameInfo;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  map: Map;
};

export class Snake {
  private speed: number = 1;
  private size: number = 11;

  private startPosition: Position = { x: 10, y: 10 };
  private x: number = this.startPosition.x;
  private y: number = this.startPosition.y;
  private last: Position = this.startPosition;

  private controller: Controller;
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private gameInfo: GameInfo;
  private map: Map;

  constructor({ controller, context, canvas, gameInfo, map }: CreateSnake) {
    this.gameInfo = gameInfo;
    this.controller = controller;
    this.context = context;
    this.canvas = canvas;
    this.map = map;

    this.map.registerObject(this.getObject());
  }

  update() {
    const direction = this.controller.getDirection();
    const action = this.controller.action;
    this.last = { x: this.x, y: this.y };

    if (action) return this.runAction(action);

    if (direction === "stop") return;

    this.move(direction);
    this.map.updateObject(this.getObject());
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

  private getObject() {
    return {
      name: "snake",
      x: this.x,
      y: this.y,
      size: this.size,
    };
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
    this.x = this.startPosition.x;
    this.y = this.startPosition.y;
    this.speed = 1;
    this.controller.cleanDirecion();
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
