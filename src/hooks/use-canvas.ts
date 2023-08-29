import { useEffect, useRef, useState } from "react";
import { GameInfo, Info } from "../game";
import { makeGame } from "../game/game.module";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [info, setInfo] = useState<Info>({ points: 0, atempts: 0 });
  const gameInfo: GameInfo = new GameInfo({ info, setInfo });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context && canvas) {
      return makeGame({ context, canvas, gameInfo });
    }
  }, [makeGame]);

  return {
    canvasRef,
    gameInfo,
  };
};
