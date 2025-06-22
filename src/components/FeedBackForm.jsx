import React, { useContext, useState, useEffect } from "react";
import Button from "./Sharder/Button";
import Card from "./Sharder/Card";
import { v4 as uuidv4 } from "uuid";
import FeedbackContext from "../context/FeedbackContext";

const FeedBackForm = () => {
  const { addFeedBack, feedbackEdit, updateFeedback, clearAll } =
    useContext(FeedbackContext);

  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {
    const trimmedText = e.target.value.trimStart();

    let textError = "";

    if (trimmedText.length < 10) {
      textError = "Character must be at least 10";
      setMessage(textError);
      setBtnDisabled(true);
    } else {
      setMessage("");
      setBtnDisabled(false);
    }

    setText(trimmedText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: uuidv4(),
      text: text,
    };

    if (feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedBack(newFeedback);
    }

    setText("");
    setBtnDisabled(true)
  };

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);    
    }

  }, [feedbackEdit]);

  return (
    <Card>
      <h3>Add your Reveiws</h3>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your ideas"
            value={text}
            onChange={handleTextChange}
          />
          <Button
            version={feedbackEdit.edit === true ? "secondary" : "primary"}
            type="submit"
            isDisabled={btnDisabled}
          >
            {feedbackEdit.edit === true ? "Update" : "Send"}
          </Button>
          <Button
            version="danger"
            type="button"
            isDisabled={false}
            onClick={() => {
              clearAll();
              setText("");
              setMessage("");
              setBtnDisabled(true);
            }}
          >
            DeleteAll
          </Button>
        </div>

        <p className="message">{message && message}</p>
      </form>
    </Card>
  );
};

export default FeedBackForm;
