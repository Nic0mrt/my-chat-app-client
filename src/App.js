import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/context";

function App() {
  const [userData, setUserData] = useState({ user: {} });

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
