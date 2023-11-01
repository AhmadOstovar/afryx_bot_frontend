import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ChatContextProvider from "./components/ChatContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChatContextProvider>
    <App />
  </ChatContextProvider>
);
