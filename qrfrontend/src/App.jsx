// App.js
import React from 'react';
import Scanner from './components/Scanner';
import History from './components/History';

function App() {
  return (
    <div>
      <h1>QR Code Scanner</h1>
      <Scanner />
      <History />
    </div>
  );
}

export default App;
