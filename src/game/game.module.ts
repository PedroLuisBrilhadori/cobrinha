import { Controller, Snake } from ".";

export type CreateGame = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

export const makeGame = ({ context, canvas }: CreateGame) => {
  const controller = new Controller();
  const color = "blue";

  const snake = new Snake({ color, controller, context, canvas });

  return snake;
};
