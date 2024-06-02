import React, { useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        const response = await fetch('http://localhost:3001/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Hello from React' }),
        });
        const data = await response.text();
        setMessage(data);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
                <button onClick={handleClick}>Send Message</button>
            </header>
        </div>
    );
}

export default App;
