// src/algorithms/dijkstra.ts
import type { CellType, AlgorithmResult } from "./types";

export function dijkstra(
  grid: CellType[][],
  start: [number, number],
  end: [number, number]
): AlgorithmResult {
  const rows = grid.length, cols = grid[0].length;
  const dist: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const prev: ([number, number] | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  const visitedOrder: [number, number][] = [];

  const pq: [number, number, number][] = []; // [dist, r, c]
  dist[start[0]][start[1]] = 0;
  pq.push([0, start[0], start[1]]);

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // min-heap simulation
    const [d, r, c] = pq.shift()!;
    if (d > dist[r][c]) continue;

    visitedOrder.push([r, c]);
    if (r === end[0] && c === end[1]) break;

    const directions = [[1,0], [-1,0], [0,1], [0,-1]];
    for (const [dr, dc] of directions) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (grid[nr][nc] === "wall") continue;

      const newDist = d + 1;
      if (newDist < dist[nr][nc]) {
        dist[nr][nc] = newDist;
        prev[nr][nc] = [r, c];
        pq.push([newDist, nr, nc]);
      }
    }
  }

  const path: [number, number][] = [];
  let cur: [number, number] | null = end;
  while (cur) {
    path.push(cur);
    cur = prev[cur[0]][cur[1]];
  }

  return { visitedOrder, path: path.reverse() };
}
