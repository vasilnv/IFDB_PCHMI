import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Register from './views/Authorization/Register/Register.js'
import isGuest from './hoc/isGuest'
import isAuthenticated from './hoc/isAuthenticated'
import { AuthProvider } from './contexts/AuthContext'
import Home from './views/Home'
import CreateRestaurant from './views/CreateRestaurant'
import Main from './views/Layout/Main.js'

import './App.scss';
import RouteWrapper from "./views/Layout/RouteWrapper.js";

export default function App() {

  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Switch>
            <RouteWrapper path="/" exact component={Home} layout={Main}/>
            <RouteWrapper path="/create-restaurant" component={CreateRestaurant} layout={Main}/>
            <Route path="/authorization" component={isGuest(Register)} />
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

