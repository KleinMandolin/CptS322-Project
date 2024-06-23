import './App.css';

// app for fetch calls implemented from: https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples
import ClickCount from './ClickCount.tsx';

function App() {
  return (
    <>
      <div className="click counter">
          <ClickCount />
      </div>
    </>
  );
}

export default App;
