const express = require('express');
const app = express();
const cors = require('cors');
const {v4: uuid} = require('uuid');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const students = require('./data/students.json');
const tutors = require('./data/tutors.json');

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));

// Middleware
app.use(cors());
app.use(express.json());

// Handle requests

// Get all students for a tutor 
app.get('/allStudents/:tutorId', (req, res) => {
  let studentIds = tutors.find(tutor => 
    tutor.id.toString() === req.params.tutorId.toString()
  ).students;

  console.log("Students:", studentIds)
  let studentObjs = students.filter(student => studentIds.includes(student.id));
  if (studentObjs.length)
    return res.status(200).json(studentObjs);
  res.status(400).json("No students yet");
});

// Get all lessons for a student
app.get('/allLessons/:studentId', (req, res) => {
  students.forEach(student => {
    if (student.id.toString() === req.params.studentId.toString()){
      res.status(200).json(student);
      return;
  }});
  //res.status(400).json("No student found.");
});

// Get specific lesson for a student
app.get('/lesson/:studentId/:id', (req, res) => {
  students.forEach(student => {
    if (student.id.toString() === req.params.studentId.toString()) {
      student.lessons.forEach(lesson => {
        if (lesson.id.toString() === req.params.id.toString()) {
          res.status(200).json(lesson);
          return;
        }
      });
    }
  });
  //res.status(400).json("No lesson found.");
});

// Post a new lesson for a student
app.post('/lesson/:studentId', (req, res) => {
  console.log(req.body.elementLi);
  res.status(200).json("ok");
  students.forEach(student => {
    // Find student with this id
    if (student.id.toString() === req.params.studentId.toString()) {
      // Add new lesson to its list of lessons
      student.lessons = student.lessons.concat({
        id: student.lessons[student.lessons.length - 1].id + 1,
        elementLi: req.body.elementLi
      });
      return res.status(200).json("Added new lesson to memory");
  }});
  //res.status(400).json("Failed to save lesson");
});

// Handle a new student signing up
app.post('/signup', (req, res) => {
  console.log(req.body);
  students.push({
    ...req.body,
    lessons: []
  });
  console.log(students);

  // If tutor key exists, add student's id to that tutor's studentLi
})