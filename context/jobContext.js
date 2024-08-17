import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const JobContext = createContext();

const JobProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState([]);

  //get course
  const getAllJob = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/job/get-all-job");
      console.log("datacheck", data);
      setLoading(false);
      setJob(data?.job);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // inintal  courses
  useEffect(() => {
    getAllJob();
  }, []);

  return (
    <JobContext.Provider value={[job, setJob, getAllJob]}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };
