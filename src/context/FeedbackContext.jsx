import { createContext, useEffect, useState } from "react";
import axios from 'axios';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    // { id: 1, text: "Sample-1 from context" },
    // { id: 2, text: "Sample-2 from context" },
    // { id: 3, text: "Sample-3 from context" },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchData();
  } , []);

  const fetchData = async () => {
    try{
      const response = await axios.get("http://localhost:3000/tasks");

      setFeedback(response.data)

    }catch(error){
      console.log("Fetching data error" , error)
    }
  };

  const addFeedBack = async (newFeedback) => {
    try{
      const response = await axios.post("http://localhost:3000/tasks" ,newFeedback , {
        headers: {
          "Content-type":"application/json"
        }
      })

      setFeedback([...feedback , response.data])

    }catch(error){
      console.log("Adding data error" , error)
    }
  };

  const updateFeedback = async (id, updItem) => {
    try{
      const response = await axios.put(`http://localhost:3000/tasks/${id}` , updItem , {
        headers:{
          "Content-type":"application/json"
        }
      })

      setFeedback(
        feedback.map((item) =>
          item.id === id ? {...item, ...response.data} : item
        )
      );

    }catch(error){
      console.log("Updating data error" , error)
    }

    // setFeedback(feedback.map((item) => (
    //   item.id === id ? {...item , ...updItem} : item
    // )))

    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  const deleteFeedback = async (id) => {
    try{
      const response  = await axios.delete(`http://localhost:3000/tasks/${id}`)
      if (window.confirm("Are your sure")) {
        setFeedback(feedback.filter((item) => item.id !== id));
      }
    }catch(error){
      console.log("Error deleting feedback" , error)
    }

   
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  const clearAll = async () => {
    if (window.confirm("Are you sure you want to clear all feedback?")) {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        const data = response.data;
        await Promise.all(
          data.map((task) => 
            axios.delete(`http://localhost:3000/tasks/${task.id}`, {
              method: "DELETE",
            })
          )
        );
    
        setFeedback([]); 
      } catch (error) {
        console.error("Error clearing all feedback:", error);
      }
    }
    
  };
  

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        addFeedBack,
        deleteFeedback,
        editFeedback,
        updateFeedback,
        clearAll
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
