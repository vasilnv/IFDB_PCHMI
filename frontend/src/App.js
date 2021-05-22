import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Register from './views/Authorization/Register/Register.js'
import isGuest from './hoc/isGuest'
import isAuthenticated from './hoc/isAuthenticated'
import { AuthProvider } from './contexts/AuthContext'
import Home from './views/Home/Home.js'
import Main from './views/Layout/Main.js'

import './App.scss';
import RouteWrapper from "./views/Layout/RouteWrapper.js";

export default function App() {

  console.log(4);

  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Switch>
            <RouteWrapper path="/" exact component={Home} layout={Main}/>
            <Route path="/authorization" component={isGuest(Register)} />
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

