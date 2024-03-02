import React from "react";
import { useLocation } from 'react-router-dom';
import NavBar from "../Nav/Nav";
import TodoSection2 from "./TodoSection2.jsx";

const Todo = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const trackId = params.get('trackId'); 
  
  return (
    <div>
      <NavBar />  
      <TodoSection2 selectedTrackId={trackId} /> 
    </div>
  );
};

export default Todo;
