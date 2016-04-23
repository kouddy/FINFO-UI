import R from 'ramda';
import React from 'react';
import Radium from 'radium';
import connectToStores from 'alt-utils/lib/connectToStores';
import {browserHistory} from 'react-router';

import CatchStore from '../stores/CatchStore';

@connectToStores
@Radium
export default class Catch extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({id: React.PropTypes.string})
  };
  state = {
  };
  static getStores() {
    return [CatchStore];
  }
  static getPropsFromStores() {
    return {catches: CatchStore.getState().catches};
  }
  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}

var styles = {
  centerAligned: {
    display: "flex",
    alignItems: "center"
  },
  leftAndRight: {
    display: "flex",
    justifyContent: "space-between"
  },
  fontAwesomeIcon: {
    fontSize: "3rem",
    marginRight: "0.5rem"
  }
};;
