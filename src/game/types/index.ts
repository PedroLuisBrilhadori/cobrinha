export type Color = "red" | "blue" | "black";
export type Direction = "up" | "down" | "left" | "right" | "stop";
export type Keys = "w" | "a" | "s" | "d";
export type KeyAction = " " | "Escape";
export type Action = "reset";
export type KeyActionMap = { " ": Action; Escape: Action };
export type Keymap = { w: Direction; a: Direction; s: Direction; d: Direction };
