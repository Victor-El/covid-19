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

function App() {
    const [countryMain, setCountryMain] = useState("");
  return (
      <AppContext.Provider value={{
          state: {
              countryList: [], setCountryList: (list) => {
                  this.countryList = list;
                  console.log(this.countryList);
              },
              country: countryMain,
              setCountry: function (val) {
                  setCountryMain(val);
                  console.log(this.country);
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
                  <Route path='/' component={Index}/>
                  <Route component={Error}/>
              </Switch>
              <FooterNav/>
          </div>
      </AppContext.Provider>
  );
}

export default App;
