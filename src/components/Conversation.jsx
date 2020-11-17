import { useState, useEffect, useRef } from "react";
import "./App.css";
import openSocket from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const input = useRef(null);
  const messageSectionEnd = useRef(null);

  const click = (e) => {
    e.preventDefault();
    if (inputText.length > 0) {
      socket.current.emit("message", inputText);
      setInputText("");
      input.current.focus();
    }
  };

  const enter = (e) => {
    if (e.key === "Enter" && inputText.length > 0) {
      click(e);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  async function fetchData() {
    const result = await fetch("http://localhost:8000/messages", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    setMessages(data.data);
  }

  useEffect(() => {
    fetchData();
    socket.current = openSocket("http://localhost:8000/");
    socket.current.on("new-message", (messages) => {
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    messageSectionEnd.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="app">
      <div className="messages-section">
        {messages.map((message, index) => {
          return (
            <div className="message-container" key={index}>
              {message}
            </div>
          );
        })}
        <div className="messages-section-end" ref={messageSectionEnd}></div>
      </div>
      <div className="input-section">
        <input
          ref={input}
          onKeyDown={enter}
          onChange={handleInputChange}
          placeholder="Message..."
          value={inputText}
        ></input>
        <button onClick={click}>Envoyer</button>
      </div>
    </div>
  );
}

export default App;
