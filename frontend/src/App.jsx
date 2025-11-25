import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState(null);
  async function handleClick() {
    try {
      const url = 'https://openai-api-worker.orbiccode.workers.dev';
      const response = await fetch(url);
      const message = await response.json();
      setMessage(message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <button onClick={handleClick}></button>
      <div>
        <p>{message && message.content}</p>
      </div>
    </main>
  );
}

export default App;
