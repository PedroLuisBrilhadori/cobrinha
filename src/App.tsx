import { useEffect, useRef } from "react";
import "./App.css";
import { makeGame } from "./game/game.module";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context && canvas) {
      const snake = makeGame({ context, canvas });

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
    }
  });

  return (
    <div className="flex justify-center items-center border-2">
      <canvas
        ref={canvasRef}
        id="game-canvas"
        width={size}
        height={size}
      ></canvas>
    </div>
  );
}

export default App;
