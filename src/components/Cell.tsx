import React from "react";
import styled from "styled-components";

type CellType = "empty" | "start" | "end" | "wall";

interface CellProps {
  type: CellType;
  onClick: () => void;
}

const StyledCell = styled.div<{ type: CellType }>`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ type }) =>
    type === "start"
      ? "green"
      : type === "end"
      ? "red"
      : type === "wall"
      ? "#333"
      : "#ccc"};
`;

const Cell: React.FC<CellProps> = ({ type, onClick }) => {
  return <StyledCell type={type} onClick={onClick} />;
};

export default Cell;
