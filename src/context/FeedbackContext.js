import { createContext, useState } from "react";
import { v4 as uuid4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This is from context",
            rating: 10
        },{
            id: 2,
            text: "This is from context 2",
            rating: 1
        },{
            id: 3,
            text: "This is from context 3",
            rating: 5
        }
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

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

      const addFeedback = (newFeedback) => {
        newFeedback.id = uuid4();
        setFeedback([newFeedback, ...feedback]);
      };

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext