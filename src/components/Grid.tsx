import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cell from "./Cell";

type CellType = "empty" | "start" | "end" | "wall";

// Wrapper flexbox to center the grid
const GridWrapper = styled.div`
  display: flex;
  justify-content: center;  /* centers horizontally */
  align-items: center;      /* centers vertically if needed */
  width: 100%;              /* full width of screen/container */
  min-height: 100vh;        /* full height to allow vertical centering */
  
`;

// Actual grid layout
const GridInner = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 30px);
  grid-template-rows: repeat(20, 30px);
  gap: 4px;                 /* space between cells */
`;

const initialGrid = () =>
  Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => "empty"));

interface GridProps {
  resetFlag: boolean;
}

const Grid: React.FC<GridProps> = ({ resetFlag }) => {
  const [grid, setGrid] = useState<CellType[][]>(initialGrid);
  const [startSet, setStartSet] = useState(false);
  const [endSet, setEndSet] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    setGrid((prev) =>
      prev.map((r, i) =>
        r.map((c, j) => {
          if (i === row && j === col) {
            if (!startSet) {
              setStartSet(true);
              return "start";
            }
            if (!endSet && c !== "start") {
              setEndSet(true);
              return "end";
            }
            if (c === "empty") return "wall";
            if (c === "wall") return "empty";
          }
          return c;
        })
      )
    );
  };

  // Reset grid when resetFlag changes
  useEffect(() => {
    setGrid(initialGrid);
    setStartSet(false);
    setEndSet(false);
  }, [resetFlag]);

  return (
  <GridWrapper>
    <GridInner>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            type={cell}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </GridInner>
  </GridWrapper>
);
};

export default Grid;
