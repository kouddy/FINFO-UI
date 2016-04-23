import R from 'ramda';
import alt from '../libs/alt';

import CatchActions from '../actions/CatchActions';

class CatchStore {
  constructor() {
    this.state = {
      catches: []
    };
    this.bindActions(CatchActions);
    this.exportPublicMethods({
    });
  }
  loadCatches(x) {
    return x;
  }
  loadCatchesSuccess(x) {
    this.state.catches = x;
    this.setState(this.state);
  }
}

export default alt.createStore(CatchStore, "CatchStore");
