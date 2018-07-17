import {FETCHING_GOALS} from './Constants'
import { Firebase, FirebaseRef } from './lib/firebase';

export function getGoals(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`goals`);

  return ref.on('value', (snapshot) => {
    console.log(snapshot.val());
    const goals = snapshot.val() || [];
    return dispatch({
      type: FETCHING_GOALS,
      data: goals,
    });
  });
}
