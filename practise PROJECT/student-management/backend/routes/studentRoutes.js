const express = require('express');
const router = express.Router();

let students = [
  { id: 101, name: "Rahul Sharma", email: "rahul@gmail.com", branch: "CSE", semester: 3, mobile: "9876543210" }
];

router.get('/', (req, res) => {
  res.json(students);
});

router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
});

router.post('/', (req, res) => {
  const { id, name, email, branch, semester, mobile } = req.body;

  if (!id || !name || !email || !branch || !semester || !mobile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const numId = parseInt(id);
  if (students.some(s => s.id === numId)) {
    return res.status(400).json({ message: 'Student ID already exists' });
  }

  const newStudent = {
    id: numId,
    name: name.trim(),
    email: email.trim(),
    branch,
    semester: parseInt(semester),
    mobile: String(mobile).trim()
  };

  students.push(newStudent);
  res.status(201).json({ message: 'Student added successfully', student: newStudent });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { name, email, branch, semester, mobile } = req.body;

  if (!name || !email || !branch || !semester || !mobile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  students[index] = {
    id,
    name: name.trim(),
    email: email.trim(),
    branch,
    semester: parseInt(semester),
    mobile: String(mobile).trim()
  };

  res.json({ message: 'Student updated successfully', student: students[index] });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deleted = students.splice(index, 1);
  res.json({ message: 'Student deleted successfully', student: deleted[0] });
});

module.exports = router;
