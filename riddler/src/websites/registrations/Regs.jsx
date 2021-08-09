import React from 'react';

import {BrowserRouter as Router,Route} from 'react-router-dom';
import Leaderboard from '../../components/game-pages/leaderboard';
import Login from '../../components/login/Login';
import Layout from '../../components/registration-navbar/Layout';
import Pages from '../../components/registration-pages/Pages';
import Timer from '../../components/registration-pages/timer/Timers';
import Token from '../../components/token/Token';

function Regs() {
    return (
        <Router>
            <Route exact path="/"><Layout /><Pages /></Route>
            
            
            <Route exact path ="/countdown">
                <Timer/>
            </Route>
            <Route exact path="/register">
                <Login/>
            </Route>
            <Route exact path="/oauth/redirect">
                <Token/>
            </Route>
            {/* <Route exact path="/play" component={}/> */}
            <Route exact path="/leaderboard">
                <Leaderboard/>
            </Route>
        </Router>
    );
};

export default Regs
