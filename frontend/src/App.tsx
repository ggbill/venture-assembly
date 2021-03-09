import React from 'react'
import { Router, Route, Switch } from "react-router-dom"
import './App.scss'
import HttpsRedirect from 'react-https-redirect'
import Home from './components/home/Home'
import Footer from './components/shared/Footer'
import { createBrowserHistory } from 'history'
import RoundPlanner from './components/roundPlanner/RoundPlanner'
import ReactGA from'react-ga'
import ScrollToTop from './components/shared/scrollToTop'
import Podcasts from './components/podcasts/Podcasts'


const history = createBrowserHistory();
ReactGA.initialize('UA-190905983-1');

history.listen((location) => {
    ReactGA.set({ page: location.pathname + location.search })
    ReactGA.pageview(location.pathname + location.search)
});

function App() {
    return (
        <HttpsRedirect>
            <Router history={history}>
            <ScrollToTop />
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
                        <Route
                            path="/podcasts"
                            component={Podcasts}
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
