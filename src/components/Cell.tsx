import React from "react";
import styled from "styled-components";

type CellType = "empty" | "start" | "end" | "wall" | "visited" | "path";

interface CellProps {
  type: CellType;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseDown: (e: React.MouseEvent) => void; // <-- FIXED
}

const StyledCell = styled.div<{ type: CellType }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #333;
  background-color: ${({ type }) =>
    type === "start"
      ? "green"
      : type === "end"
      ? "red"
      : type === "wall"
      ? "#222"
      : type === "visited"
      ? "#4fc3f7"
      : type === "path"
      ? "#ffeb3b"
      : "#ddd"};
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;

const Cell: React.FC<CellProps> = ({ type, onClick, onMouseEnter, onMouseDown }) => {
  return (
    <StyledCell
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown} // now event type matches
    />
  );
};

export default Cell;
