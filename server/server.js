const express = require('express');
const app = express();
const cors = require('cors');
const {v4: uuid} = require('uuid');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const student1 = require('./data/student1.json');
const students = [student1];

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));

// Middleware
app.use(cors());
app.use(express.json());

// Handle requests

// Get all lessons for a student
app.get('/allLessons/:studentId', (req, res) => {
  students.forEach(student => {
    console.log(req.params.studentId)
    if (student.id.toString() === req.params.studentId.toString()){
      res.status(200).json(student1);
      return;
  }});
  //res.status(400).json("No student found.");
});

// Get specific lesson for a student
app.get('/lesson/:studentId/:id', (req, res) => {
  students.forEach(student => {
    console.log(req.params.studentId)
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
})