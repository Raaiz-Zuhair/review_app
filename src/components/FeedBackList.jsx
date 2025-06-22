import React, { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from '../context/FeedbackContext'

const FeedBackList = () => {

  const {feedback} = useContext(FeedbackContext);

    if(feedback.length === 0) return <h3>No Reviews yet</h3>

  return (
    feedback.map(item => (
        <FeedbackItem key={item.id} item={item} />
    ))
  )
}

export default FeedBackList