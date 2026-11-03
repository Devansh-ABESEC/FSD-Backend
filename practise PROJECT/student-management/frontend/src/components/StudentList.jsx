import React from 'react';
import './StudentList.css';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return <div className="empty-message card">No students found</div>;
  }

  return (
    <div className="table-wrapper card">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.branch}</td>
              <td>{s.semester}</td>
              <td>{s.mobile}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(s)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
