import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreatePost from "./components/CreatePost/CreatePost";
import AllPost from "./components/AllPost/AllPost";
import EditPost from "./components/EditPost/EditPost";
import Navbar from "./components/container-components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={AllPost} />
          <Route exact path="/create" component={CreatePost} />
          <Route exact path="/edit" component={EditPost} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
