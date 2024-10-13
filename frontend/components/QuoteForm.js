import React, { useReducer, useEffect } from "react"; // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_AUTHOR = "CHANGE_AUTHOR";
const CHANGE_QUOTE = "CHANGE_QUOTE";
const RESET_FORM = "RESET_FORM";

// 👇 create your initial state object here
const initialState = {
  author: "",
  quoteText: "",
};

// 👇 create your reducer function here
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_AUTHOR:
      return { ...state, author: action.payload };
    case CHANGE_QUOTE:
      return { ...state, quoteText: action.payload };
    case RESET_FORM:
      return { ...state, author: "", quoteText: "" };
      return state;
    default:
      return state;
  }
};

// export default function QuoteForm({ createQuote = () => { } }) {
export default function QuoteForm({ createQuote }) {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeAuthor = (evt) => {
    // 👇 implement
    dispatch({ type: CHANGE_AUTHOR, payload: evt.target.value });
  };
  const onChangeQuote = (evt) => {
    // 👇 implement
    dispatch({ type: CHANGE_QUOTE, payload: evt.target.value });
  };
  const resetForm = () => {
    // 👇 implement
    dispatch({ type: RESET_FORM });
  };
  const onNewQuote = () => {
    // 👇 implement
    event.preventDefault();
    createQuote({ authorName: state.author, quoteText: state.quoteText });
    resetForm();
  };

  useEffect(() => {
    console.log("quote form state updated: ", state);
  }, [state]);

  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label>
        <span>Author:</span>
        <input
          type="text"
          name="authorName"
          placeholder="type author name"
          onChange={onChangeAuthor}
          value={state.author}
        />
      </label>
      <label>
        <span>Quote text:</span>
        <textarea
          type="text"
          name="quoteText"
          placeholder="type quote"
          onChange={onChangeQuote}
          value={state.quoteText}
        />
      </label>
      <label>
        <span>Create quote:</span>
        <button role="submit">DO IT!</button>
      </label>
    </form>
  );
}
