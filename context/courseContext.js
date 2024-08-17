import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const CourseContext = createContext();

const CourseProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState([]);

  //get course
  const getAllCourse = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/course/get-all-course");
      setLoading(false);
      setCourse(data?.course);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // inintal  courses
  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <CourseContext.Provider value={[course, setCourse, getAllCourse]}>
      {children}
    </CourseContext.Provider>
  );
};

export { CourseContext, CourseProvider };
