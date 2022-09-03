import Cube from "/src/cube";

export function buildLevel(game, level) {
  let cubes = [];

  level.forEach((row, rowIndex) => {
    row.forEach((cube, cubeIndex) => {
      if (cube === 1) {
        let position = {
          x: 50 * cubeIndex,
          y: 50 * rowIndex
        };
        cubes.push(new Cube(game, position));
      }
    });
  });

  return cubes;
}

export const level1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const level2 = [
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
