import alt from '../libs/alt';

import OperationActions from '../actions/OperationActions';

class OperationStore {
  constructor() {
    this.state = {
      operations: []
    };
    this.bindActions(OperationActions);
    this.exportPublicMethods({
    });
  }
  loadOperations(x) {
    return x;
  }
  loadOperationsSuccess(x) {
    this.state.operations = x.data;
    this.setState(this.state);
  }
}

export default alt.createStore(OperationStore, "OperationStore");
