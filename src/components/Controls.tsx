import React, { useState } from "react";
import styled from "styled-components";

type Algorithm = "BFS" | "DFS" | "Dijkstra";
type Speed = "Slow" | "Medium" | "Fast";

interface ControlsProps {
  onReset: () => void;
  onVisualize: (algorithm: Algorithm, speed: Speed) => void;
}

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 8px 14px;
  background: ${(props) =>
    props.variant === "secondary" ? "#f44336" : "#4caf50"};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.variant === "secondary" ? "#d32f2f" : "#43a047"};
  }

  &:disabled {
    background: #9e9e9e;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  background: white;
`;

const Controls: React.FC<ControlsProps> = ({ onReset, onVisualize }) => {
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>("BFS");
  const [speed, setSpeed] = useState<Speed>("Medium");

  return (
    <Wrapper>
      <Select
        value={selectedAlgo}
        onChange={(e) => setSelectedAlgo(e.target.value as Algorithm)}
      >
        <option value="BFS">BFS</option>
        <option value="DFS">DFS</option>
        <option value="Dijkstra">Dijkstra</option>
      </Select>

      <Select value={speed} onChange={(e) => setSpeed(e.target.value as Speed)}>
        <option value="Slow">Slow</option>
        <option value="Medium">Medium</option>
        <option value="Fast">Fast</option>
      </Select>

      <Button
        onClick={() => onVisualize(selectedAlgo, speed)}
        disabled={!selectedAlgo}
      >
        Visualize
      </Button>
      <Button variant="secondary" onClick={onReset}>
        Reset Grid
      </Button>
    </Wrapper>
  );
};

export default Controls;
