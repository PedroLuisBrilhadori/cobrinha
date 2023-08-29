import { GameInfo } from "../../game";

export type GameInfoProps = {
  gameInfo: GameInfo;
};

export const GameInfoComponent = ({ gameInfo }: GameInfoProps) => {
  return (
    <div className="flex justify-between">
      <p>Tentativas: {gameInfo.getAtempt()}</p>
      <p>Pontos: {gameInfo.getPoints()}</p>
    </div>
  );
};
