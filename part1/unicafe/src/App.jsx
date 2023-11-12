import { useState } from "react";

function Header({ text }) {
  return <h1>{text}</h1>;
}

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function Statistics({ good, neutral, bad }) {
  const all = good + neutral + bad;
  const average = all ? (good - bad) / all : 0;
  const positive = all ? (good / all) * 100 : 0;

  return all === 0 ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
}

function App() {
  // States
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handlers
  const incrementGoodCount = () => setGood(good + 1);
  const incrementNeutralCount = () => setNeutral(neutral + 1);
  const incrementBadCount = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={incrementGoodCount} />
      <Button text="neutral" onClick={incrementNeutralCount} />
      <Button text="bad" onClick={incrementBadCount} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
