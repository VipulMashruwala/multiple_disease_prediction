import React from 'react';
import { Switch, Redirect,Route } from 'react-router-dom'
import Header from "./components/Header/Header";
import './App.css';
import Diabetes from './pages/Diabetes/Diabetes';
import Heart from './pages/Heart/Heart';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Liver from './pages/Liver/Liver';
import Kidney from './pages/Kidney/Kidney';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


const App = () => {
  return (
    <div className="App">
        
          <Switch>
                <Route exact path="/" component={Home}>
                    <Home />
                </Route>

                <Route exact path="/signup" component={SignUp}>
                    <SignUp />
                </Route>

                <Route exact path="/signin" component={SignIn}>
                    <SignIn />
                </Route>
                
                <Route exact path="/diabetes" component={Diabetes}>
                  <Diabetes />
                </Route>

                <Route exact path="/heart" component={Heart}>
                  <Heart />
                </Route>

                <Route exact path="/liver" component={Liver}>
                  <Liver />
                </Route>

                <Route exact path="/kidney" component={Kidney}>
                  <Kidney />
                </Route>

                <Route exact path="/diabetes/predict" component={Predict}>
                  <Predict />
                </Route>

                <Route exact path="/heart/predict" component={Predict}>
                  <Predict />
                </Route>

                <Route exact path="/liver/predict" component={Predict}>
                  <Predict />
                </Route>

                <Route exact path="/kidney/predict" component={Predict}>
                  <Predict />
                </Route>

                <Route  path="*" component={Home}>
                  <Home />
                </Route>
          </Switch>
  
    </div>
  );
}

export default App;
