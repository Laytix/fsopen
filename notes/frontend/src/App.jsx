import { useState, useEffect, useRef } from "react";
import noteService from "./services/notes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NoteList from "./components/NoteList";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes))
      .catch((err) => console.error("Failed to fetch notes:", err));
  }, []);


  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/create">
          new note
        </Link>
      </div>

      <Routes>
        <Route path="/notes" element={<NoteList notes={notes} />} />
        <Route path="/create" element={<NoteForm createNote={addNote} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
