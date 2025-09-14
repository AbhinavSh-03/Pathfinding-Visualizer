import { useState } from "react";
import styled from "styled-components";
import Grid from "./components/Grid";
import Controls from "./components/Controls";

const AppContainer = styled.div`
  min-height: 100vh;          /* full viewport height */
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

  const handleReset = () => {
    setResetFlag((prev) => !prev); // toggles reset signal
  };

  const handleVisualizeBFS = () => {
    setVisualizeFlag((prev) => !prev); // toggles visualize signal
  };

  return (
    <AppContainer>
      <h1>Pathfinding Visualizer</h1>
      <Controls onReset={handleReset} onVisualizeBFS={handleVisualizeBFS} />
      <Grid resetFlag={resetFlag} visualizeFlag={visualizeFlag} />
    </AppContainer>
  );
}

export default App;

