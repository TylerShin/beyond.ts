import * as React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./navbar.scss");

interface INavbarComponentProps {}

@withStyles<typeof NavbarComponent>(styles)
export default class NavbarComponent extends React.PureComponent<INavbarComponentProps, {}> {
  public render() {
    return (
      <nav className={styles.navbarWrapper}>
        <ul className={styles.leftBox}>
          <Link className={styles.navbarLogo} to="/">
            React &#10084; Lambda
          </Link>
        </ul>
        <ul className={styles.rightBox}>
          <li className={styles.navItem}>
            <Link className="nav-link" to="/">
              HOME
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className="nav-link" to="/docs">
              Documentation
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className="nav-link" to="/users/tylorshin">
              Async Example
            </Link>
          </li>
          <li className={styles.navItem}>
            <a className="nav-link" href="mailto:shincode@icloud.com">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
