import './App.css';
import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

const App = () => (
  <div>
    <div class="sidebar">
      <ul>
        <li>
          <a href="/">首页</a>
        </li>
        <li>
          <a href="/demoA">demoA</a>
        </li>
        <li>
          <a href="/demoB">demoB</a>
        </li>
        <li>
          <a href="/demoC">demoC</a>
        </li>
        <li>
          <a href="/phoneList">手机号</a>
        </li>
        <li>
          <a href="/heatMap">热力图</a>
        </li>
        <li>
          <a href="/angular/index.html">angular</a>
        </li>
        <li>
          <a href="/react/index.html">react</a>
        </li>
        <li>
          <a href="/vue/index.html">vue</a>
        </li>
      </ul>
    </div>
    <div class="container">
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    </div>
  </div>
);

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);
const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/topics">Topics</Link>
    </li>
  </ul>
);

export default App;