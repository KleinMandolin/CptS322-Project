import { useState } from 'react'
import './App.css'

// Base multiple counter array with buttons code from:
// https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array

let itemNames: string[]=['milk','eggs','cheese']

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index: number) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          {' '}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>{itemNames[i]}</button>
        </li>
      ))}
    </ul>
  );
}
{/*
function App() {
  const [eggcount, setCount] = useState(0);

  return (
    <>
      <div className="menu item">
        <button onClick={() => setCount((eggcount) => eggcount + 1)}>
          <div>#14</div>
          <div><h2>Eggs</h2></div>
        </button>
        {' '}
        <p>
          Amount of Eggs ordered: {eggcount}
        </p>
      </div>
    </>
  )
}

export default App
*/}
