const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create a new project
router.post('/', (req, res) => {
  const newProject = new Project(req.body);
  newProject.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newProject);
  });
});

// Get all projects
router.get('/', (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(projects);
  });
});

// Get a single project by id
router.get('/:id', (req, res) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(project);
  });
});

// Update a project
router.put('/:id', (req, res) => {
  Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }, // This will return the updated project
    (err, project) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(project);
    }
  );
});

// Delete a project
router.delete('/:id', (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, project) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(project);
  });
});

module.exports = router;
