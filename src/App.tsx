import { useState } from "react";
import styled from "styled-components";
import Grid from "./components/Grid";
import Controls from "./components/Controls";

const AppContainer = styled.div`
  min-height: 100vh;          /* full viewport height */
  width: 100%;                /* full width */
  background-color: #111;
  color: #fff;
  display: flex;
  flex-direction: column;     
  justify-content: flex-start; /* keeps content near top (or 'center' to vertically center) */
  align-items: center;         /* centers horizontally */
  padding-top: 20px;           /* optional space from top */
`;


function App() {
  const [resetFlag, setResetFlag] = useState(false);

  const handleReset = () => {
    setResetFlag((prev) => !prev); // toggles reset signal
  };

  return (
    <AppContainer>
      <h1>Pathfinding Visualizer</h1>
      <Controls onReset={handleReset} />
      <Grid resetFlag={resetFlag} />
    </AppContainer>
  );
}

export default App;
