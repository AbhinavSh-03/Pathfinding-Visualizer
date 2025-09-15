// src/algorithms/types.ts
export type CellType = "empty" | "start" | "end" | "wall" | "visited" | "path";

export interface AlgorithmResult {
  visitedOrder: [number, number][];
  path: [number, number][];
}
