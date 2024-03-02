import React, { useState } from 'react';
import getAccessToken from "../../util/getAccessToken";
import axios, { AxiosError } from 'axios';

const CreateProjectPage = () => {
  const [projectName, setProjectName] = useState('');
  // collaborators is a list of ids
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [collaboratorInput, setCollaboratorInput] = useState('');

  const handleAddCollaborator = () => {
    if (collaboratorInput) {
      setCollaborators([...collaborators, collaboratorInput]);
      setCollaboratorInput(''); // Clear input after adding
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) {
      alert('You must be logged in to create a project.');
      return;
    }

    // Here you would typically send the data to your backend

    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/SOMETHING`, { projectName, collaborators });
      console.log('Creating project:', projectName, 'with collaborators:', collaborators);
      // TODO: Handle success, redirect to the project page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('SignIn Error:', error.response?.data);
        // TODO: Handle error, send user to home or login page
      } else {
        // Handle non-Axios errors
        console.error('SignIn Error:', error);
      }
    }

    // Reset form
    setProjectName('');
    setCollaborators([]);
  };

  return (
    <div>
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="collaboratorInput">Add Collaborator:</label>
          <input
            id="collaboratorInput"
            value={collaboratorInput}
            onChange={(e) => setCollaboratorInput(e.target.value)}
          />
          <button type="button" onClick={handleAddCollaborator}>Add</button>
        </div>
        {collaborators.length > 0 && (
          <ul>
            {collaborators.map((collaborator, index) => (
              <li key={index}>{collaborator}</li>
            ))}
          </ul>
        )}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;
