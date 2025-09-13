import React from "react";
import styled from "styled-components";

interface ControlsProps {
  onReset: () => void;
}

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 14px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #43a047;
  }
`;

const Controls: React.FC<ControlsProps> = ({ onReset }) => {
  return (
    <Wrapper>
      <Button onClick={onReset}>Reset Grid</Button>
    </Wrapper>
  );
};

export default Controls;
