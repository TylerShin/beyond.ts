import * as React from "react";
import { Link } from "react-router";
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./navbar.scss");

interface INavbarComponentProps {}

@withStyles<typeof NavbarComponent>(styles)
export default class NavbarComponent extends React.PureComponent<INavbarComponentProps, {}> {
  public render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <a className="navbar-brand" href="#">React &#10084; Lambda</a>
          <div className="collapse navbar-collapse justify-content-end" id="main-navbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">HOME</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/docs">Documentation</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users/tylorshin">Async Example</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="mailto:shincode@icloud.com">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
