import React, {useState} from 'react';
import './App.css';
import Home from './components/Home';
import {Route, Switch} from "react-router-dom";
import Error from "./components/Error";
import NavBar from "./components/NavBar";
import MapView from "./components/MapView";
import CasesByCountry from "./components/CasesByCountry";
import Index from "./components/Index";
import FooterNav from "./components/FooterNav";
import {AppContext} from "./index";
import Analytics from "./components/Analytics";
import News from "./components/News";

function App() {
    const [countryMain, setCountryMain] = useState("");
  return (
      <AppContext.Provider value={{
          state: {
              country: countryMain,
              setCountry: function (val) {
                  setCountryMain(val);
                  console.log("State Value", countryMain);
                  console.log("Object Value", this.country);
                  console.log("State Value", countryMain);
              }
          }
      }}>
          <div className="App">
              <NavBar/>
              <Switch>
                  <Route path="/home" component={Home}/>
                  <Route path="/maps" component={MapView}/>
                  <Route path="/analytics" component={Analytics}/>
                  <Route path="/country-cases" component={CasesByCountry}/>
                  <Route path='/news' component={News}/>
                  <Route path='/' component={Index}/>
                  <Route component={Error}/>
              </Switch>
              <FooterNav/>
          </div>
      </AppContext.Provider>
  );
}

export default App;
