export type Info = {
  points: number;
  atempts: number;
  loaded: boolean;
};

export type CreateGameInfo = {
  info: Info;
  setInfo: React.Dispatch<React.SetStateAction<Info>>;
};

export class GameInfo {
  private points: number = 0;

  private atempts: number = 0;

  private loaded: boolean = false;

  private setInfo: React.Dispatch<React.SetStateAction<Info>>;

  constructor({ info: { points, atempts }, setInfo }: CreateGameInfo) {
    this.points = points;
    this.atempts = atempts;
    this.setInfo = setInfo;
  }

  private updateInfo() {
    this.setInfo({
      points: this.points,
      atempts: this.atempts,
      loaded: this.loaded,
    });
  }

  loadingComplete() {
    this.loaded = true;
    this.setInfo((value) => {
      value.loaded = this.loaded;
      return value;
    });
  }

  reset() {
    this.points = 0;
    this.atempts = 0;
  }

  addPoints(value: number = 0) {
    this.points += 1 + value;
    this.updateInfo();
  }

  getPoints() {
    return this.points;
  }

  addAtempt(value: number = 0) {
    this.atempts += 1 + value;
    this.updateInfo();
  }

  getAtempt() {
    return this.atempts;
  }
}
