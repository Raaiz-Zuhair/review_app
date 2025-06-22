import React, { useContext, useState } from 'react'
import FeedbackContext from '../context/FeedbackContext'


const FeedbackStats = () => {

    const {feedback} = useContext(FeedbackContext);

    const [review , setReview] = useState("Review: ")

  return (
    <div className='feedbackState'>
        <h4>
          {feedback.length < 2 ? review : "Reviews: "}{feedback.length}
        </h4>
    </div>
  )
}

export default FeedbackStats