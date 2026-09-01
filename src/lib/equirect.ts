export const MAP_WIDTH = 360;
export const MAP_HEIGHT = 180;

export function projectToMap(lon: number, lat: number) {
  return { x: lon + 180, y: 90 - lat };
}
