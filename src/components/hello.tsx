import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as syncExampleActions from '../actions/syncExampleActions';

interface HelloProps { syncExample:any; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
      console.log(this.props);
      return (
        <h1>Hello World!</h1>
      );
    }
}
