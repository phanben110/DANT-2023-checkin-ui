import React from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./routes/index";

function App() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        overflowX: "hidden"
      }}
    >
      <ToastContainer autoClose={3000} />
      <Routes/>
    </div>
  );
}

export default App;
