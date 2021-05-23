import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Register from './views/Authorization/Register/Register.js'
import isGuest from './hoc/isGuest'
import isAuthenticated from './hoc/isAuthenticated'
import { AuthProvider } from './contexts/AuthContext'
import Home from './views/Home'
import CreateRestaurant from './views/CreateRestaurant'
import AccountBlock from './views/AccountBlock'
import MyAccount from './views/MyAccount'
import RestaurantPage from './views/RestaurantPage'
import SearchPage from './views/SearchPage';
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
            <RouteWrapper path="/block" component={AccountBlock} layout={Main}/>
            <RouteWrapper path="/my-account" component={MyAccount} layout={Main}/>
            <RouteWrapper path="/restaurant/:restaurantId" component={RestaurantPage} layout={Main}/>
            <RouteWrapper path="/search/:search" component={SearchPage} layout={Main}/>
            <Route path="/authorization" component={isGuest(Register)} />
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

