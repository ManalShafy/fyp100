// import React, { createContext, useState, useEffect } from "react";

// import axios from "axios";

// //context
// const PostContext = createContext();

// const PostProvider = ({ children }) => {
//   //state
//   const [loading, setLoading] = useState(false);
//   const [posts, setPosts] = useState([]);

//   //get posts
//   // const getAllPosts = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const { data } = await axios.get("/post/get-all-post", {
//   //       timeout: 10000,
//   //       validateStatus: function (status) {
//   //         return status >= 200 && status < 500; // Resolve only if the status code is less than 500
//   //       },
//   //     });
//   //     setLoading(false);
//   //     setPosts(data?.posts);
//   //   } catch (error) {
//   //     console.log(error);
//   //     setLoading(false);
//   //   }
//   // };

//   // const getAllPosts = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const { data } = await axios.get("/post/get-all-post", {
//   //       timeout: 60000,
//   //       validateStatus: (status) => status >= 200 && status < 500,
//   //     });
//   //     setPosts(data?.posts || []);
//   //   } catch (error) {
//   //     if (error.code === "ECONNABORTED") {
//   //       console.error("Request timed out:", error.message);
//   //     } else {
//   //       console.error("Network error:", error);
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const getAllPosts = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const controller = new AbortController();
//   //     const timeoutId = setTimeout(() => controller.abort(), 10000); // Set a timeout of 60 seconds

//   //     const response = await fetch("/api/v1/post/get-all-post", {
//   //       signal: controller.signal,
//   //     });

//   //     clearTimeout(timeoutId);

//   //     // Handle HTTP errors like you did with axios validateStatus
//   //     if (!response.ok && response.status >= 500) {
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     }

//   //     const data = await response.json();
//   //     setPosts(data?.posts || []);
//   //   } catch (error) {
//   //     if (error.name === "AbortError") {
//   //       console.error("Request timed out:", error.message);
//   //     } else {
//   //       console.error("Network error:", error.message);
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   //get posts
//   const getAllPosts = async () => {
//     setLoading(true);
//     try {
//       console.log("herere");
//       const { data } = await axios.get("/post/get-all-post");
//       console.log(data, "djasjdgj");
//       setLoading(false);
//       setPosts(data?.posts);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // inintal  posts
//   useEffect(() => {
//     console.log("object");
//     getAllPosts();
//   }, []);

//   return (
//     <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
//       {children}
//     </PostContext.Provider>
//   );
// };

// export { PostContext, PostProvider };
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //get posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/quiz/get-all-post");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // inintal  posts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
