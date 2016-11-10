import * as React from "react";

interface ICssInjectorContainerProps extends CssInjector {
}

export const css = new Set(); // CSS for all rendered React components

class CssInjector extends React.Component<ICssInjectorContainerProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  public getChildContext() {
    return {
      insertCss(...styles: any[]) {
        styles.forEach((style) => {
          if (typeof window === "undefined") {
            css.add(style._getCss());
          } else {
            style._insertCss();
          }
        });
      },
    };
  }

  public render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

(CssInjector as React.ComponentClass<any>).childContextTypes = {
  insertCss: React.PropTypes.func.isRequired,
};

export default CssInjector as React.ComponentClass<any>;
