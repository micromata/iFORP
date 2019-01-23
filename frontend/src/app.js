import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import injectSheet from 'react-jss';
import { dottedBackground } from './theme';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Start from './pages/Start/Start';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ProjectOverview from './pages/ProjectOverview/ProjectOverview';
import Project from './pages/Project/Project';

class App extends Component {
  render() {
    return (
      <div className={`${this.props.classes.App} App`}>
        <Router>
          <React.Fragment>
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Start} />
              <ProtectedRoute exact path="/projects" component={ProjectOverview} />
              <ProtectedRoute path="/projects/:id" component={Project} />
              <Route path="**" component={PageNotFound} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const styles = theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    'html,body,#root,.App': {
      height: '100%',
      width: '100%',
    },
    body: {
      margin: 0,
      backgroundColor: theme.backgroundColor,
      fontFamily: 'Verdana',
      color: theme.textColor,
    },
  },
  App: {
    ...dottedBackground(
      theme.DottedBackground.backgroundColor,
      theme.DottedBackground.dotColor,
      '22px',
      '2px'
    ),
  },
});

export default injectSheet(styles)(App);
