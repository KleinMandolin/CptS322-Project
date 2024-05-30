import { useState } from 'react';
import './App.css';

// app for fetch calls implemented from: https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples
import ClickCount from './ClickCount.tsx';

function App() {
  return (
    <>
      <div className="click counter">
        <p>
          <ClickCount />
        </p>
      </div>
    </>
  );
}

export default App;
