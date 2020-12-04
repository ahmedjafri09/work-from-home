const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const error = schema.validate(req.body);
  console.log(error);

  if (error.error) {
    res.status(400).send(error.error.details[0].message);
  }
  //   if (!req.body.name || req.body.name.length < 3) {
  //     //400 means bad request
  //     res.status(400).send("Name is required and should be minimum 3 characters");
  //     return;
  //   }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with given ID was not found.");
  res.send(course);
});

app.listen(port, () => console.log(`Listening to port ${port}`));
