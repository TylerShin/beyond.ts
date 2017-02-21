import * as React from "react";
import { Link } from "react-router";
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./navbar.scss");

interface INavbarComponentProps {}

@withStyles<typeof NavbarComponent>(styles)
export default class NavbarComponent extends React.PureComponent<INavbarComponentProps, {}> {
  public render() {
    return (
      <ul className={styles.navbarWrapper}>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/docs">Documentation</Link></li>
        <li>
          <Link to="/users/tylorshin">Ashyc Example</Link>
        </li>
        <li><a href="mailto:shincode@icloud.com">Contact</a></li>
      </ul>
    );
  }
}
