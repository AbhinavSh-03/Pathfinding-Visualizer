import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { bfs } from "../algorithms/bfs";
import Cell from "./Cell";

type CellType = "empty" | "start" | "end" | "wall" | "visited" | "path";

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  padding-top: 20px;
  user-select: none;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 32px);
  grid-template-rows: repeat(20, 32px);
  gap: 3px;
  background: #222;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.4);
`;

const initialGrid = () =>
  Array.from({ length: 20 }, () =>
    Array.from({ length: 20 }, () => "empty" as CellType)
  );

interface GridProps {
  resetFlag: boolean;
  visualizeFlag: boolean;
}

const Grid: React.FC<GridProps> = ({ resetFlag, visualizeFlag }) => {
  const [grid, setGrid] = useState<CellType[][]>(initialGrid);
  const [startPos, setStartPos] = useState<[number, number] | null>(null);
  const [endPos, setEndPos] = useState<[number, number] | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Handle single click
  const handleCellClick = (row: number, col: number) => {
    setGrid((prev) =>
      prev.map((r, i) =>
        r.map((c, j) => {
          if (i === row && j === col) {
            if (!startPos) {
              setStartPos([row, col]);
              return "start";
            }
            if (!endPos && c !== "start") {
              setEndPos([row, col]);
              return "end";
            }
            if (c === "wall") return "empty"; // remove wall
            if (c === "empty") return "wall"; // add wall
          }
          return c;
        })
      )
    );
  };

  // Drag paint walls
  const handleMouseEnter = (row: number, col: number) => {
    if (!isMouseDown) return;
    setGrid((prev) =>
      prev.map((r, i) =>
        r.map((c, j) => {
          if (i === row && j === col && c === "empty") {
            return "wall";
          }
          return c;
        })
      )
    );
  };

  // Reset grid
  useEffect(() => {
    setGrid(initialGrid);
    setStartPos(null);
    setEndPos(null);
  }, [resetFlag]);

  // BFS visualization
  useEffect(() => {
    if (!visualizeFlag || !startPos || !endPos) return;

    const { visitedOrder, path } = bfs(grid, startPos, endPos);

    // Animate visited
    visitedOrder.forEach(([r, c], i) => {
      setTimeout(() => {
        setGrid((prev) =>
          prev.map((row, ri) =>
            row.map((cell, ci) => {
              if (
                ri === r &&
                ci === c &&
                prev[ri][ci] === "empty" // don’t overwrite walls/start/end
              ) {
                return "visited";
              }
              return cell;
            })
          )
        );
      }, 30 * i);
    });

    // Animate path
    setTimeout(() => {
      path.forEach(([r, c], i) => {
        setTimeout(() => {
          setGrid((prev) =>
            prev.map((row, ri) =>
              row.map((cell, ci) => {
                if (
                  ri === r &&
                  ci === c &&
                  prev[ri][ci] !== "start" &&
                  prev[ri][ci] !== "end"
                ) {
                  return "path";
                }
                return cell;
              })
            )
          );
        }, 50 * i);
      });
    }, 30 * visitedOrder.length + 300);
  }, [visualizeFlag]);

  return (
    <OuterWrapper
      onMouseDown={(e) => {
        if (e.button === 0) setIsMouseDown(true); // left only
      }}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      <GridWrapper>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              type={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseDown={(e) => {
                if (e.button === 0) handleCellClick(rowIndex, colIndex);
              }}
            />
          ))
        )}
      </GridWrapper>
    </OuterWrapper>
  );
};

export default Grid;
