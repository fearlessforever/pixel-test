import React, { Component } from 'react'
import {Router,Route,Switch} from 'react-router'
import createHistory from 'history/createHashHistory'


import FilmList from '../pages/FilmList'
import FilmDetail from '../pages/FilmDetail'
import Error404 from '../pages/Error404'

class Routenya extends Component{
    render() {
        let {...props} = this.props;
        return (
            <Router history={ createHistory() }>
              <div className="App">
                <Switch>
                    <Route exact path="/"  render={ propsz =><FilmList {...props} {...propsz} /> } > </Route>
                    <Route path="/film-detail/:sub" render={ propsz =><FilmDetail {...props} {...propsz} /> } ></Route>
                    <Route component={Error404} ></Route>
                </Switch>
              </div>
            </Router>
        );
    }
}

export default Routenya;