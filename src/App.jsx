import React from "react";
import Header from "./components/Header";
import FeedBackList from "./components/FeedBackList";
import FeedBackForm from "./components/FeedBackForm";
import FeedbackStats from "./components/FeedbackStats";


const App = () => {
  
  return (
    <>
      <Header bg="#333333" txtClor="white" heading={"Review APP"} />

      <div className="container">
        <FeedBackForm />
        <FeedbackStats/>
        <FeedBackList/>
      </div>
    </>
  );
};

export default App;
