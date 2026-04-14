import { useState, useEffect, useRef } from 'react';
import './App.css';

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('notable_notes');
      setNotes(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setNotes([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('notable_notes', JSON.stringify(notes));
  }, [notes, isLoaded]);

  const addNote = (text) => {
    if (!text.trim()) return;
    setNotes((prev) => [
      { id: Date.now(), text: text.trim(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => {
    if (window.confirm('Delete all notes?')) setNotes([]);
  };

  return { notes, isLoaded, addNote, deleteNote, clearAll };
}

function NoteInput({ onSave }) {
  const [text, setText] = useState('');
  const ref = useRef(null);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(text);
    setText('');
    ref.current?.focus();
  };

  return (
    <div className="input-wrapper">
      <div className={`input-card ${text ? 'active' : ''}`}>
        <textarea
          ref={ref}
          className="note-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSave()}
          placeholder="What's on your mind?"
          rows={4}
        />
        <div className="input-footer">
          <span className="input-hint">
            {text ? `${text.length} chars · ` : ''}Ctrl+Enter to save
          </span>
          <button className="save-btn" onClick={handleSave} disabled={!text.trim()}>
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteCard({ note, onDelete }) {
  const formatDate = (iso) => {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60)    return 'Just now';
    if (diff < 3600)  return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <article className="note-card">
      <div className="note-accent" />
      <div className="note-body">
        <p className="note-text">{note.text}</p>
        <time className="note-time">{formatDate(note.createdAt)}</time>
      </div>
      <button className="delete-btn" onClick={() => onDelete(note.id)} title="Delete">✕</button>
    </article>
  );
}

function NotesList({ notes, onDelete, onClear, isLoaded }) {
  if (!isLoaded) return <p className="notes-loading">Loading…</p>;

  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <div className="empty-icon">📝</div>
        <h2 className="empty-title">No notes yet</h2>
        <p className="empty-sub">Your thoughts are waiting to be written.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="notes-header">
        <span className="notes-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
        <button className="clear-btn" onClick={onClear}>Clear all</button>
      </div>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteCard note={note} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  const { notes, isLoaded, addNote, deleteNote, clearAll } = useNotes();

  return (
    <div className="page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <main className="container">
        <header className="app-header">
          <div className="logo-mark">N</div>
          <div>
            <h1 className="app-title">Notable</h1>
            <p className="app-subtitle">A quiet place for your thoughts</p>
          </div>
        </header>
        <NoteInput onSave={addNote} />
        <NotesList notes={notes} onDelete={deleteNote} onClear={clearAll} isLoaded={isLoaded} />
      </main>
    </div>
  );
}