import { useState } from "react";
import styled from "styled-components";
import Grid from "./components/Grid";
import Controls from "./components/Controls";

type Algorithm = "BFS" | "DFS" | "Dijkstra";
type Speed = "Slow" | "Medium" | "Fast";

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #111;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
`;

function App() {
  const [resetFlag, setResetFlag] = useState(false);
  const [visualizeFlag, setVisualizeFlag] = useState(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>("BFS");
  const [speed, setSpeed] = useState<Speed>("Medium");

  const handleReset = () => {
    setResetFlag((prev) => !prev);
  };

  const handleVisualize = (algo: Algorithm, spd: Speed) => {
    setAlgorithm(algo);
    setSpeed(spd);
    setVisualizeFlag((prev) => !prev);
  };

  return (
    <AppContainer>
      <h1>Pathfinding Visualizer</h1>
      <Controls onReset={handleReset} onVisualize={handleVisualize} />
      <Grid
        resetFlag={resetFlag}
        visualizeFlag={visualizeFlag}
        algorithm={algorithm}
        speed={speed}
      />
    </AppContainer>
  );
}

export default App;
