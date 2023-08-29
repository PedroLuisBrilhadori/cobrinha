import { Controller, GameInfo, Snake, Food } from ".";

export type CreateGame = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gameInfo: GameInfo;
};

export const makeGame = ({ context, canvas, gameInfo }: CreateGame) => {
  const controller = new Controller();
  controller.registerController();
  const color = "blue";

  const snake = new Snake({ gameInfo, color, controller, context, canvas });
  const food = new Food({ canvas, context, gameInfo, seconds: 3 });

  let frames = 0;
  let framId = 0;

  const loop = () => {
    snake.update();
    snake.draw();
    food.update();
    food.draw();

    frames = frames + 1;
    framId = window.requestAnimationFrame(loop);
  };

  loop();

  return () => {
    window.cancelAnimationFrame(framId);
  };
};
