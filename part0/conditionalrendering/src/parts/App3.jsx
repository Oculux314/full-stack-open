import BlueText from "./components/BlueText";
import OrangeText from "./components/OrangeText";
import ColorText from "./components/ColorText";
import { useState } from "react";

const App = () => {
  // 0: orange
  // 1: blue
  const [state, setState] = useState(0);

  function toggleState() {
    setState(!state);
  }

  return (
    <div>
      <h2>App</h2>
      {state ? <BlueText /> : <OrangeText />}
      <ColorText color={state} />
      <button onClick={toggleState}>Toggle</button>
    </div>
  );
};

export default App;
