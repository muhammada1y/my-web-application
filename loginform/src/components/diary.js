import React, { useState, useEffect } from 'react';

const Diary = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [selectedNote, setSelectedNote] = useState(null);

  // Retrieve user ID from local storage
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const user_id = userInfo?.user_id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const saveNote = async () => {
    if (!user_id) {
      console.error('User ID is null. Unable to save note.');
      return;
    }

    try {
      const response = await fetch('http://localhost:2006/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          title: newNote.title,
          content: newNote.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setNotes((prevNotes) => (prevNotes ? [...prevNotes, data] : [data]));
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:2006/api/notes/${userInfo.user_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data.mynotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await fetch(`http://localhost:2006/api/notes/${noteId}`, {
        method: 'DELETE',
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async () => {
    if (!selectedNote) {
      console.error('No note selected for update.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:2006/api/notes/${selectedNote.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === selectedNote.id ? updatedNote : note))
      );
      setNewNote({ title: '', content: '' });
      setSelectedNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const selectNoteForUpdate = (note) => {
    setSelectedNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Fix dependency array

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Write a new note:</h2>
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label className="block mt-4 mb-2">Content:</label>
        <textarea
          name="content"
          value={newNote.content}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={saveNote}
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Save Note
        </button>
        <button
          onClick={updateNote}
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Uodata Note
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        <button
          onClick={fetchNotes}
          className="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600"
        >
          Fetch Notes
        </button>
        {notes.map((note) => (
          <div key={note.id} className="border p-4 mb-4 rounded">
            <h3 className="text-xl font-bold">Title: {note.title}</h3>
            <p className="mt-2">Content: {note.content}</p>
            <div className="mt-4">
              <button
                onClick={() => selectNoteForUpdate(note)}
                className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
              >
                changes
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary;
