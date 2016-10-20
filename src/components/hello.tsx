import * as React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as syncExampleActions from '../actions/syncExampleActions';
import { SyncExampleState } from '../reducers/syncExample';

interface IHelloProps extends React.Props<any> {
  syncExample: SyncExampleState;
  increaseCounter: () => void;
  decreaseCounter: () => void;
};


function mapStateToProps(state: any) {
  return {
    syncExample: state.syncExample,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    increaseCounter: (): void => dispatch(),
    decreaseCounter: (): void  => dispatch(),
  };
}

class Hello extends React.Component<IHelloProps, {}> {
    render() {
      const { compiler, framework } = this.props.syncExample;
      return (
        <div>
          <h1>Hello World!</h1>
          <div>This component is synchronously loaded!</div>
          <div>We are using {framework} with {compiler}</div>
        </div>
      );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);

export function fetch(username: string) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${username}`)
    .then((res) => {
      console.log(res.data);
      resolve(res.data);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}
