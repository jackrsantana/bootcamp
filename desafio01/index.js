const express = require("express");

const server = express();

server.use(express.json());

let requestCount = 0;
const projects = [
  {
    id: "1",
    title: "Novo Projeto",
    task: []
  },
  {
    id: "2",
    title: "Novo Projeto",
    task: []
  },
  {
    id: "3",
    title: "Novo Projeto",
    task: []
  }
];

// MIDDLEWARE

function requestLog(req, res, next) {
  console.log(`Request Count: ${++requestCount}`);
  return next();
}

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(item => item.id === id);

  if (!project) {
    return res.status(400).json(`Error: Project does not exists.`);
  }

  return next();
}

server.use(requestLog);

// ROTAS

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    task: []
  };

  projects.push(project);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(item => item.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => item.id === id);

  projects.splice(index, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(item => item.id === id);
  project.task.push(title);

  return res.json(project);
});

server.listen(3000);
