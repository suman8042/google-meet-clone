const MessageListReducer = (state, action) => {
    switch (action.type) {
      case "addMessage":
        // Using the spread operator to ensure immutability
        return [...state, action.payload];
      default:
        // Return the current state if no relevant action type is found
        return state;
    }
  };
  
  export default MessageListReducer;
  