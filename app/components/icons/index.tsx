import * as React from "react";
import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./icons.scss");

interface IIconProps extends React.SVGAttributes<SVGElement> {
  icon: string;
}

const ICONS: { [key: string]: any } = {
  // SHARE: require("./share.svg").default,
};

@withStyles<typeof Icon>(styles)
class Icon extends React.PureComponent<IIconProps, {}> {
  public render() {
    let className = styles.icon;
    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    const svg = ICONS[this.props.icon];

    // HACK: For test
    if (!svg || typeof svg === "string") {
      return (
        <i className={className}>
          {svg}
        </i>
      );
    } else {
      const icon = `
      <svg viewBox="${svg.viewBox}">
        <use xlink:href="#${svg.id}" />
      </svg>`;

      return <i className={className} dangerouslySetInnerHTML={{ __html: icon }} />;
    }
  }
}

export default Icon;
