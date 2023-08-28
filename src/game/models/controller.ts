import {
  Action,
  Direction,
  KeyAction,
  KeyActionMap,
  Keymap,
  Keys,
} from "../types";

export type CreateController = {};

export class Controller {
  action: null | Action = null;
  private direction: Direction = "stop";

  handleDirection({ key }: KeyboardEvent) {
    if (this.isMovimentKey(key)) return this.setDirection(key);

    if (this.isActionKey(key)) return this.setAction(key);
  }

  registerController() {
    const handler = (event: KeyboardEvent) => {
      this.handleDirection(event);
    };

    window.addEventListener("keydown", (event) => {
      console.log(event.key);
      handler(event);
    });
  }

  getDirection(): Direction {
    return this.direction;
  }

  clearAction() {
    this.action = null;
  }

  private setAction(key: string) {
    const map: KeyActionMap = { " ": "reset", Escape: "reset" };
    this.action = map[key as KeyAction];
  }

  private setDirection(key: string) {
    const map: Keymap = { w: "up", a: "left", s: "down", d: "right" };
    this.direction = map[key as Keys];
  }

  private isMovimentKey(key: string): boolean {
    const keys = ["w", "a", "s", "d"];

    if (keys.includes(key)) return true;

    return false;
  }

  private isActionKey(key: string): boolean {
    const keys = [" ", "Escape"];

    if (keys.includes(key)) return true;

    return false;
  }
}
