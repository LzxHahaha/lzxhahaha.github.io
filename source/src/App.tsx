import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Post from './pages/Post';

class App extends React.Component {
  public render() {
    if (!window.fetch) {
      return (
        <a href="https://www.google.com/chrome/">点击进入文明社会</a>
      );
    }

    return (
      <Router>
        <div className="g-page">
          <div className="m-top-bar">Home</div>
          <div className="m-container">
            <Route exact path="/" component={Home} />
            <Route path="/post" component={Post} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
