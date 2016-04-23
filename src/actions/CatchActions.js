import alt from '../libs/alt';
import firebase from '../libs/firebase';
import axios from '../libs/axios';

class CatchActions {
  loadCatches() {
    var self = this;
    return function(dispatch) {
      dispatch();
      axios.get('/catch').then(self.loadCatchesSuccess.bind(self));
    }
  }
  loadCatchesSuccess(x) {
    console.log(x);
    return x;
  }
}

export default alt.createActions(CatchActions);
