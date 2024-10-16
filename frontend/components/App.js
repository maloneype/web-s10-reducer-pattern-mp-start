import React, { useReducer, useEffect } from "react";
import Quotes from "./Quotes";
import QuoteForm from "./QuoteForm";

const CREATE_QUOTE = "CREATE_QUOTE";
const DELETE_QUOTE = "DELETE_QUOTE";
const EDIT_QUOTE_AUTHENTICITY = "EDIT_QUOTE_AUTHENTICITY"; // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = "SET_HIGHLIGHTED_QUOTE"; // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY"; // 👈 toggles whether to show all or only non-apocryphal

let id = 1;
const getNextId = () => id++; // 👈 this is a helper to create new quotes

// 👇 create your initial state object here
const initialState = {
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
  highlightedQuote: 0,
  displayAllQuotes: true,
};

const reducer = (state, action) => {
  // 👇 implement your reducer here using the action types above
  switch (action.type) {
    case CREATE_QUOTE:
      return { ...state, quotes: [...state.quotes, action.payload] };
    case DELETE_QUOTE:
      return { ...state, quotes: action.payload };
    case EDIT_QUOTE_AUTHENTICITY:
      return { ...state, quotes: action.payload };
    case SET_HIGHLIGHTED_QUOTE:
      return {
        ...state,
        highlightedQuote:
          action.payload === state.highlightedQuote ? null : action.payload,
      };
    case TOGGLE_VISIBILITY:
      return { ...state, displayAllQuotes: !state.displayAllQuotes };
    default:
      return state;
  }
};

export default function App() {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  const createQuote = ({ authorName, quoteText }) => {
    const newQuote = {
      id: getNextId(),
      quoteText: quoteText,
      authorName: authorName,
      apocryphal: false,
    };
    dispatch({ type: CREATE_QUOTE, payload: newQuote });
  };
  const deleteQuote = (id) => {
    const filteredQuotes = state.quotes.filter((quote) => quote.id != id);
    dispatch({ type: DELETE_QUOTE, payload: filteredQuotes });
  };
  const editQuoteAuthenticity = (id) => {
    const updatedQuotes = state.quotes.map((qt) => {
      if (qt.id === id) return { ...qt, apocryphal: !qt.apocryphal };
      return qt;
    });
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: updatedQuotes });
  };
  const setHighlightedQuote = (id) => {
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id });
  };
  const toggleVisibility = () => {
    dispatch({ type: TOGGLE_VISIBILITY });
  };

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={state.quotes}
        deleteQuote={deleteQuote}
        highlightedQuote={state.highlightedQuote}
        displayAllQuotes={state.displayAllQuotes}
        editQuoteAuthenticity={editQuoteAuthenticity}
        setHighlightedQuote={setHighlightedQuote}
        toggleVisibility={toggleVisibility}
      />
      <QuoteForm createQuote={createQuote} />
    </div>
  );
}
