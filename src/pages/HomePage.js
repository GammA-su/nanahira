import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { addProject } from '../redux/actions';  // Assumes you have a Redux action named addProject

function HomePage() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const projects = useSelector(state => state.projects); // Assumes your projects are stored in Redux state
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(addProject({ title, goal }));
    setTitle('');
    setGoal('');
    handleClose();
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Goal"
            type="text"
            fullWidth
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
