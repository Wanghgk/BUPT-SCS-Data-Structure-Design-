import React,{useRef} from "react";
import {NavLink,useRoutes } from "react-router-dom";
import routes from "./routes"
import LeftBar from "./pages/LeftBar/LeftBar"
import './App.css';

function App() {

  const element = useRoutes(routes);

  return (
      <div className={"app"}>
          {element}
      </div>
  );
}

export default App;
