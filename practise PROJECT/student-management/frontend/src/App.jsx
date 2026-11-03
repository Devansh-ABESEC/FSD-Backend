import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchStudent from './components/SearchStudent';
import './App.css';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const notify = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const getStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      notify(err.response?.data?.message || 'Error fetching data', 'error');
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingStudent) {
        const res = await axios.put(`${API_URL}/${editingStudent.id}`, data);
        notify(res.data.message);
        setEditingStudent(null);
      } else {
        const res = await axios.post(API_URL, data);
        notify(res.data.message);
      }
      getStudents();
    } catch (err) {
      notify(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete student ${id}?`)) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      notify(res.data.message);
      if (editingStudent?.id === id) setEditingStudent(null);
      getStudents();
    } catch (err) {
      notify(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const filtered = students.filter((s) =>
    String(s.id).includes(searchTerm) ||
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Student Management System</h1>
      </header>

      <main className="container">
        {message.text && (
          <div className={`alert ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="layout">
          <StudentForm
            onSubmit={handleSave}
            editingStudent={editingStudent}
            onCancel={() => setEditingStudent(null)}
          />

          <div className="main-panel">
            <SearchStudent
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />
            <StudentList
              students={filtered}
              onEdit={setEditingStudent}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
