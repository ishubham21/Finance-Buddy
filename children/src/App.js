import './App.css';

import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

const authGuard = (Component) => {
    return localStorage.getItem("token") ? <Component /> : <Redirect to="/login" />
}

const App = () => (
    <Router >
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/dashboard">
                {authGuard(Dashboard)}
            </Route>
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    </Router>
);

export default App;
