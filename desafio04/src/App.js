import React from "react";

import "./App.css";
import profile from "./assets/profile.jpg";
import Header from "./components/Header";
import PostList from "./components/PostList";

function App() {
  return (
    <>
      {/* <h1>Hello Jackson Santana</h1>
      <img src={profile} width="200px" /> */}
      <Header />
      <PostList />      
    </>
  );
}

export default App;
