import { Direction } from "../types";

export type CreateController = {};
export type Keys = "w" | "a" | "s" | "d";
export type Keymap = { w: Direction; a: Direction; s: Direction; d: Direction };

export class Controller {
  private direction: Direction = "stop";

  constructor() {
    const handleDirection = ({ key }: KeyboardEvent) => {
      const keys = ["w", "a", "s", "d"];
      const map: Keymap = { w: "up", a: "left", s: "down", d: "right" };

      if (!keys.includes(key)) return;

      this.direction = map[key as Keys];
    };

    window.addEventListener("keydown", handleDirection);
  }

  getDirection(): Direction {
    return this.direction;
  }
}
