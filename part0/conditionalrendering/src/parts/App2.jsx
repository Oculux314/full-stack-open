import BlueText from "./components/BlueText";
import OrangeText from "./components/OrangeText";
import ColorText from "./components/ColorText";

const App = () => {
  // 0: orange
  // 1: blue
  const state = Math.round(Math.random());

  return (
    <div>
      <h2>App</h2>
      {state ? <BlueText /> : <OrangeText />}
      <ColorText color={state} />
    </div>
  );
};

export default App;
