import "./App.css";
import { GameInfoComponent } from "./components";
import { useCanvas } from "./hooks/use-canvas";

function App() {
  const size = 300;
  const { canvasRef, gameInfo } = useCanvas();

  return (
    <div>
      <GameInfoComponent gameInfo={gameInfo} />
      <div className="flex justify-center items-center border-2">
        <canvas
          ref={canvasRef}
          id="game-canvas"
          width={size}
          height={size}
        ></canvas>
      </div>
    </div>
  );
}

export default App;
