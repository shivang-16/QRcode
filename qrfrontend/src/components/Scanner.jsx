import React, { useState } from 'react';
import{ QrReader} from 'react-qr-reader';
import axios from 'axios';
import './scanner.scss'
const Scanner = () => {
  const [result, setResult] = useState('No result');
  const [scanning, setScanning] = useState(true);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      setScanning(false);
    }
  }

  const handleError = (err) => {
    console.error(err);
  }
  
  const saveQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/qrcodes', { content: result.text });
  
      console.log('QR code saved:', response.data);
      setResult('No result');
      setScanning(true);
    } catch (error) {
      console.error('Error saving QR code:', error);
    }
  }
  

  return (
    <div className="scanner-container">
      {scanning ? (
        <QrReader
          onResult={handleScan}
          style={{ width: '100%' }}
          className="qr-scanner"
        />
      ) : (
        <div className="scanned-data">
          <p>Scanned Data: {result.text}</p>
          {result !== 'No result' && (
            <button onClick={saveQRCode}>Save</button>
          )}
          <button onClick={() => setScanning(true)}>Scan Again</button>
        </div>
      )}
    </div>
  );
}

export default Scanner;