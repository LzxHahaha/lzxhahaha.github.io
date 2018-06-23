import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
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
          <div className="m-top-bar">
            <Link to="/">LZXHAHAHA</Link>
            <a href="https://github.com/lzxhahaha" target="_blank">
              <img src="/Octocats.png" />
            </a>
          </div>
          <div className="m-container">
            <Route exact path="/" component={Home} />
            <Route path="/post/:number" component={Post} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
