export type Object = {
  name: string;
  x: number;
  y: number;
  size: number;
};

export class Map {
  private objects: Object[] = [];

  registerObject(object: Object) {
    if (this.objectExists(object.name))
      throw new Error("O Objeto já existe no mapa");

    this.objects.push(object);
  }

  updateObject(object: Object) {
    if (!this.objectExists(object.name))
      throw new Error("O objeto não existe no mapa");

    this.objects.forEach((obj, index) => {
      if (obj.name === object.name) {
        this.objects[index] = object;
        return;
      }
    });
  }

  checkColsion(object: Object) {
    if (!this.objectExists(object.name))
      throw new Error("O objeto não existe no mapa");

    const result = this.objects.filter(({ x, y, name }) => {
      const colision = object.x === x || object.y === y;
      const otherObject = name !== object.name;

      return colision && otherObject;
    });

    return result.length === 0;
  }

  private objectExists(name: string) {
    return this.objects.filter((obj) => obj.name === name).length !== 0;
  }
}
