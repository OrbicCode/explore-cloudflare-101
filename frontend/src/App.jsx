import { useState } from 'react';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState(null);

  const messages = [
    {
      role: 'system',
      content: 'You are an experienced guide in Middle-Earth',
    },
    {
      role: 'user',
      content: 'How can I get from Rivendell to Mordor?',
    },
  ];
  async function handleClick() {
    try {
      console.log('fetching');
      const url = 'https://openai-api-worker.orbiccode.workers.dev';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });

      if (!response.ok) {
        throw new Error(`Worker Error: ${response.error}`);
      }

      const apiResponse = await response.json();

      setApiResponse(apiResponse);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <main>
      <button onClick={handleClick}>fetch data</button>
      <div>
        <p>{apiResponse && apiResponse.content}</p>
      </div>
    </main>
  );
}

export default App;
