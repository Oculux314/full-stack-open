import { useState } from "react";

function getInitialAnecdotes() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  return anecdotes.map((anecdote) => ({ text: anecdote, votes: 0 }));
}

const VoteDisplay = ({ votes }) => {
  return <p>has {votes} votes</p>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  function generateNewRandomIndex() {
    let random;
    do {
      random = Math.floor(Math.random() * anecdotes.length);
    } while (random === selectedIndex);
    return random;
  }

  function handleClick() {
    setSelected(anecdotes.length > 1 ? generateNewRandomIndex() : 0);
  }

  function handleVote() {
    const newAnecdotes = [...anecdotes];
    newAnecdotes[selectedIndex].votes++;
    setAnecdotes(newAnecdotes);
  }

  const [anecdotes, setAnecdotes] = useState(getInitialAnecdotes());
  const [selectedIndex, setSelected] = useState(0);
  const topAnecdote = anecdotes.reduce((top, current) => {
    return current.votes > top.votes ? current : top;
  });

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selectedIndex].text}</p>
      <VoteDisplay votes={anecdotes[selectedIndex].votes} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{topAnecdote.text}</p>
      <VoteDisplay votes={topAnecdote.votes} />
    </div>
  );
};

export default App;
