import React from "react";
import Navbar from "./components/Navbar";
import Search from "./pages/Search.js";
import Saved from "./pages/Saved.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Search} />
                    <Route exact path="/saved" component={Saved} />
                    <Route component={Search} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;