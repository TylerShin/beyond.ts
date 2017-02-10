import * as React from "react";
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./navbar.scss");

interface INavbarComponentProps {}

@withStyles<typeof NavbarComponent>(styles)
export default class NavbarComponent extends React.PureComponent<INavbarComponentProps, {}> {
  public render() {
    return (
      <ul>
        <li>HOME</li>
        <li>Sync Example</li>
        <li>Ashyc Example</li>
        <li>Meta tags</li>
        <li>Contact</li>
      </ul>
    );
  }
}
