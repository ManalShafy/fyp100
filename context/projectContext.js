import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Project context
const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  // State for loading and projects
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  // Function to get all projects
  const getAllProjects = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/project/get-all-project");
      console.log("datacheck", data);
      setLoading(false);
      setProjects(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Initial fetch of projects
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <ProjectContext.Provider value={[projects, setProjects, getAllProjects]}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
