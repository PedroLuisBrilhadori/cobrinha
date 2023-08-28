import { Controller, Snake } from ".";

export type CreateGame = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

export const makeGame = ({ context, canvas }: CreateGame) => {
  const controller = new Controller();
  const color = "blue";

  const snake = new Snake({ color, controller, context, canvas });

  let frames = 0;
  let framId = 0;

  const loop = () => {
    snake.update();
    snake.draw();

    frames = frames + 1;
    framId = window.requestAnimationFrame(loop);
  };

  loop();

  return () => {
    window.cancelAnimationFrame(framId);
  };
};
