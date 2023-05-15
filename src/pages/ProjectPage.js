import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatInterface from '../components/ChatInterface.js';  // Component to interact with GPT-4
import RoutesGraph from '../components/RoutesGraph';  // Component to display the project routes

function ProjectPage() {
  const { id } = useParams();  // ID of the project
  const project = useSelector(state => state.projects.find(project => project.id === id));
  const [selectedRoute, setSelectedRoute] = useState(null);  // The selected route
  const [conversation, setConversation] = useState(null);  // The conversation history

  // Fetch the project details using the ID from the parameters
  useEffect(() => {
    fetch(`/api/project/${id}`)
      .then(response => response.json())
      .then(data => {
        // Update the project state here
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  useEffect(() => {
    // Fetch the chat history with GPT-4 for this project
    fetch(`/api/conversation/${id}`)
      .then(response => response.json())
      .then(data => {
        setConversation(data.history);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    // Re-prompt GPT-4 with the selected route
    // Note: You will have to implement this yourself.
    // It will depend on how you've set up GPT-4
  };

  return (
    <div>
      <h1>{project.title}</h1>
      <div style={{ display: 'flex' }}>
        <RoutesGraph routes={project.routes} onSelect={handleRouteSelect} />
        <ChatInterface selectedRoute={selectedRoute} conversation={conversation} />
      </div>
    </div>
  );
}

export default ProjectPage;
