import { createContext, useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
          setFeedback(feedback.filter((item) => item.id !== id));
        }
      };

      const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map(item => item.id === id 
            ? {...item, ...updItem}
            : item
            ))
      }

      const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
      }

      const addFeedback = async(newFeedback) => {
        const response = await fetch('/feedback', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body(newFeedback)
        })
        
        const data = await response.json()
        
        setFeedback([data, ...feedback]);
      };

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext