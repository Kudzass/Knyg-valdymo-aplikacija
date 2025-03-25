import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "" });
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.year) return;

    if (editingBookId === null) {
      fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          author: form.author,
          year: parseInt(form.year),
        }),
      })
        .then((res) => res.json())
        .then((newBook) => {
          setBooks((prev) => [...prev, newBook]);
          setForm({ title: "", author: "", year: "" });
        });
    } else {
      fetch(`http://localhost:5000/books/${editingBookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          author: form.author,
          year: parseInt(form.year),
        }),
      })
        .then((res) => res.json())
        .then((updatedBook) => {
          setBooks((prev) =>
            prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
          );
          setEditingBookId(null);
          setForm({ title: "", author: "", year: "" });
        });
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      year: book.year.toString(),
    });
    setEditingBookId(book.id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBooks((prev) => prev.filter((b) => b.id !== id));
      });
  };

  return (
    <div className="app-container">
      <h1>Knygų valdymo aplikacija</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Pavadinimas"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Autorius"
          value={form.author}
          onChange={handleChange}
        />
        <input
          name="year"
          placeholder="Metai"
          type="number"
          value={form.year}
          onChange={handleChange}
        />
        <button type="submit">
          {editingBookId ? "Išsaugoti pakeitimus" : "Pridėti knygą"}
        </button>
      </form>

      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-info">
              {book.title} – {book.author} ({book.year})
            </div>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEdit(book)}>
                Redaguoti
              </button>
              <button
                className="book-delete"
                onClick={() => handleDelete(book.id)}
              >
                Ištrinti
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
