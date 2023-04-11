import React from 'react'

export default function Dummy() {
  console.log("user state changed", user);
  let resp = UserService.getMyProfile();
  dispatch(LogIn(resp.data.fbUser));
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  const uid = user?.uid;
  localStorage.setItem("uid", uid);

  return
}
