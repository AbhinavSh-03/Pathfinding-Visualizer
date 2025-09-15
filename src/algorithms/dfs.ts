// src/algorithms/dfs.ts
import type { CellType, AlgorithmResult } from "./types";

export function dfs(
  grid: CellType[][],
  start: [number, number],
  end: [number, number]
): AlgorithmResult {
  const visitedOrder: [number, number][] = [];
  const visited = new Set<string>();
  const path: [number, number][] = [];
  let found = false;

  function dfsHelper(r: number, c: number) {
    if (
      found ||
      r < 0 ||
      c < 0 ||
      r >= grid.length ||
      c >= grid[0].length
    )
      return;

    if (grid[r][c] === "wall") return;

    const key = `${r}-${c}`;
    if (visited.has(key)) return;

    visited.add(key);
    visitedOrder.push([r, c]);

    if (r === end[0] && c === end[1]) {
      path.push([r, c]);
      found = true;
      return;
    }

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const [dr, dc] of directions) {
      dfsHelper(r + dr, c + dc);
      if (found) {
        path.push([r, c]); // backtrack
        return;
      }
    }
  }

  dfsHelper(start[0], start[1]);

  return { visitedOrder, path: path.reverse() };
}
