import { useState, useEffect } from 'react';
import './App.css';

/*
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
*/
function App() {
  const [secretClickCount, setCount] = useState(0);
  const [publicClickCount, setPubCount] = useState(0);
  const [currTime, setTime] = useState('12:00');

  return (
    <>
      <div className="click button">
        <button onClick={() => setCount(secretClickCount + 1)}>
          <div>
            <h2>Click me!</h2>
          </div>
        </button>
      </div>

      <div className="click count">
        <p>Times button has been clicked: {publicClickCount}</p>
        <button onClick={() => setPubCount(secretClickCount)}>
          <div>Refresh Count</div>
        </button>{' '}
        <button
          onClick={() => {
            setPubCount(0);
            setCount(0);
          }}
        >
          <div>Reset Count</div>
        </button>
      </div>

      <div className="time button">
        <p>
          <button onClick={() => setTime('6:00')}>
            <div>
              <h2>The time is: {currTime}</h2>
            </div>
          </button>
        </p>
      </div>
    </>
  );
}

export default App;
