import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';
import {Divider, LeftNav, MenuItem, RaisedButton} from 'material-ui';

import AltContainer from 'alt-container';

import Home from './components/Home.jsx';
import Catches from './components/Catches.jsx';
import Catch from './components/Catch.jsx';
import Operations from './components/Operations.jsx';

import CatchActions from './actions/CatchActions';
import OperationActions from './actions/OperationActions';
import CatchStore from './stores/CatchStore';
import OperationStore from './stores/OperationStore';

export default class App extends React.Component {
  state = {
    showSplashScreen: true,
    showLeftNav: false
  }
  componentDidMount() {
    /* Bootstap data. */
    CatchActions.loadCatches();
    OperationActions.loadOperations();

    /* After 4 seconds, go to actual app. */
    setTimeout(() => {
      this.state.showSplashScreen = false;
      this.setState(this.state);
    }.bind(this), 4000);
  }
  onToggleLeftNav = () => {
    this.state.showLeftNav = !this.state.showLeftNav;
    this.setState(this.state);
  }
  onCloseLeftNav = () => {
    this.state.showLeftNav = false;
    this.setState(this.state);
  }
  onRequestLeftNavChange = (open) => {
    this.state.showLeftNav = open;
    this.setState(this.state);
  }
  render() {
    if (this.state.showSplashScreen) {
      return (
        <div style={{
          height: "100%",
          backgroundColor: "rgb(118, 214, 227)",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: "2em",
            color: "white"
          }}>Welcome to FINFO!</div>
          <img src={"/public/Fish_sashimi_long.gif"} style={{
            marginTop: "1em",
            width: "40%"
          }}/>
          <div style={{
            fontSize: "2em",
            color: "white"
          }}>Loading ...</div>
        </div>
      )
    }

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top" style={{
          backgroundColor: "rgb(118, 214, 227)",
          borderColor: "rgb(118, 214, 227)",
          boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.75)"
        }}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-brand btn btn-link" onClick={this.onToggleLeftNav}>
                <i className="fa fa-bars" style={{
                  color: "white"
                }}/>
              </button>
            </div>
          </div>
        </nav>
        <LeftNav docked={false} width={200} open={this.state.showLeftNav} onRequestChange={this.onRequestLeftNavChange}>
          <Link to="/" style={{
            textDecoration: "none"
          }}>
            <MenuItem onClick={this.onCloseLeftNav} style={{
              fontSize: "1.4em",
              color: "white",
              backgroundColor: "rgb(118, 214, 227)"
            }}>
              FINFO
            </MenuItem>
          </Link>
          <Divider/>
          <Link to="/catches" style={{
            textDecoration: "none"
          }}>
            <MenuItem onClick={this.onCloseLeftNav}>Catches</MenuItem>
          </Link>
          <Link to="/operations" style={{
            textDecoration: "none"
          }}>
            <MenuItem onClick={this.onCloseLeftNav}>Operations</MenuItem>
          </Link>
          <Divider/>
          <MenuItem primaryText="About Us"/>
          <MenuItem primaryText="Help & Feedback"/>
        </LeftNav>
        <div className="container" style={{
          paddingTop: 70/* default navbar height (50px) + navbar's margin (20px) */
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

class CatchesContainer extends React.Component {
  render() {
    return (
      <AltContainer stores={[CatchStore]} inject={{
        catches: () => CatchStore.getState().catches || []
      }}>
        <Catches/>
      </AltContainer>
    );
  }
}

class OperationsContainer extends React.Component {
  render() {
    return (
      <AltContainer stores={[OperationStore]} inject={{
        operations: () => OperationStore.getState().operations || []
      }}>
        <Operations/>
      </AltContainer>
    );
  }
}

const div = document.createElement('div');
div.style.height = "100%";
document.body.appendChild(div);

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="catches" component={CatchesContainer}/>
      <Route path="operations" component={OperationsContainer}/>
      <Route path="driver/:id" component={Operations}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, div);
