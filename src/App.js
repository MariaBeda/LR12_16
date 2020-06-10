import React, {Component} from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";
import Main from "./content/Main";
import Info from "./content/Info";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <Switch>
                    <Route path={'/'} exact>
                        <Main />
                    </Route>
                    <Route path={'/info'}>
                        <Info />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;