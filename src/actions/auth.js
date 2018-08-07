import { firebase, googleAuthProvider, githubAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid: uid
});

export const startLogin = (service) => {
  switch(service) {
    case 'google':
      return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
      };
    case 'github':
      return () => {
        return firebase.auth().signInWithPopup(githubAuthProvider);
      };
    case 'facebook':
      return () => {
        return firebase.auth().signInWithPopup(facebookAuthProvider);
      };
    default:
      return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
      };
  }
  
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};