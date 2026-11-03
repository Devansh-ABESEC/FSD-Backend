import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const empty = { id: '', name: '', email: '', branch: 'CSE', semester: '1', mobile: '' };

const StudentForm = ({ onSubmit, editingStudent, onCancel }) => {
  const [formData, setFormData] = useState(empty);

  useEffect(() => {
    setFormData(editingStudent || empty);
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingStudent) setFormData(empty);
  };

  return (
    <form className="student-form card" onSubmit={handleSubmit}>
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>

      <div className="form-group">
        <label>Student ID</label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          disabled={!!editingStudent}
          required
        />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Branch</label>
        <select name="branch" value={formData.branch} onChange={handleChange}>
          <option value="CSE">CSE</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>
      </div>

      <div className="form-group">
        <label>Semester</label>
        <input
          type="number"
          name="semester"
          min="1"
          max="8"
          value={formData.semester}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          pattern="[0-9]{10}"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingStudent ? 'Update' : 'Add'}
        </button>
        {editingStudent && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
