import alt from '../libs/alt';
import firebase from '../libs/firebase';
import axios from '../libs/axios';

class OperationActions {
  loadOperations() {
    var self = this;
    return function(dispatch) {
      dispatch();
      axios.get('/operation').then(self.loadOperationsSuccess.bind(self));
    }
  }
  loadOperationsSuccess(x) {
    return x;
  }
}

export default alt.createActions(OperationActions);
