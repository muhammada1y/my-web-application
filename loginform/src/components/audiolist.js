import React, { useEffect, useState } from 'react';

const AudioList = () => {
  const [audioData, setAudioData] = useState([]);
  const userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:2002/audio?user_id=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Received data from the server:', data);

        if (!data || data.length === 0) {
          throw new Error('Data is undefined or empty.');
        }

        setAudioData(data);
      } catch (error) {
        console.error('Error fetching MP3 data:', error);
      }
    };

    fetchData();
  }, [userId]); // Include userId in the dependency array

  return (
    <div>
      <h2>Audio Data</h2>
      <div>
        <ul>
          {audioData.map((item) => (
            <li key={item.id}>
              <p>Title: {item.title}</p>
              <p>Description: {item.description}</p>
              {/* Embed the audio player */}
              <audio controls>
                <source src={`data:audio/mpeg;base64,${item.file_data}`} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudioList;
