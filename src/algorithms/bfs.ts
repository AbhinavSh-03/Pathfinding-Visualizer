// src/algorithms/bfs.ts
import type { CellType, AlgorithmResult } from "./types";

export function bfs(
  grid: CellType[][],
  start: [number, number],
  end: [number, number]
): AlgorithmResult {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const parent: Record<string, [number, number] | null> = {};
  const visitedOrder: [number, number][] = [];
  const path: [number, number][] = [];

  const queue: [number, number][] = [];
  queue.push(start);
  visited[start[0]][start[1]] = true;
  parent[`${start[0]}-${start[1]}`] = null;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length) {
    const [r, c] = queue.shift()!;
    visitedOrder.push([r, c]);

    if (r === end[0] && c === end[1]) break;

    for (let [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visited[nr][nc] &&
        grid[nr][nc] !== "wall"
      ) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
        parent[`${nr}-${nc}`] = [r, c];
      }
    }
  }

  let curr: [number, number] | null = end;
  while (curr) {
    path.push(curr);
    curr = parent[`${curr[0]}-${curr[1]}`] ?? null;
  }
  path.reverse();

  return { visitedOrder, path };
}
