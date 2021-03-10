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
import PodcastPage from './components/podcastPage/PodcastPage'
import PitchDeckReview from './components/pitchDeckReview/PitchDeckReview'


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
                        <Route
                            path="/podcasts/:videoId"
                            component={PodcastPage}
                            exact
                        />
                        <Route
                            path="/pitch-deck-review"
                            component={PitchDeckReview}
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
