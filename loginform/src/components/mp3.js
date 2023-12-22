import React, {  useRef } from 'react';


const AudioUpload = () => {
  const hiddenFileInput = useRef(null);

  const handleFile = (file) => {
    console.log('File uploaded:', file);

    // Fetch API to upload the file
    const formData = new FormData();
    formData.append('audioFile', file);

    fetch('http://localhost:2002/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle the error
      });
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <div>
      <div>
        <h2>mp3 upload</h2>
        <button className="button_ado" onClick={handleClick} type="button">
          Upload MP3
        </button>
        <input
          type="file"
          accept="audio/*"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default AudioUpload;
