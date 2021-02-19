import React, { useEffect } from 'react'
import { Router, Route, Switch } from "react-router-dom"
import './App.scss'
import HttpsRedirect from 'react-https-redirect'
import Home from './components/home/Home'
import Footer from './components/shared/Footer'
import { createBrowserHistory } from 'history'
import RoundPlanner from './components/roundPlanner/RoundPlanner'


const history = createBrowserHistory();

function App() {
    return (
        <HttpsRedirect>
            <Router history={history}>
                <div className="full-height-content">
                    <Switch>
                        <Route
                            path="/"
                            component={Home}
                            exact
                        />
                        <Route
                            path="/round-planner"
                            component={RoundPlanner}
                            exact
                        />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </HttpsRedirect>
    );
}

export default App;
