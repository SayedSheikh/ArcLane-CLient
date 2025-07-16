import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const emailPassSignup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleAuth = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubAuth = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const emailPassLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (obj) => {
    return updateProfile(auth.currentUser, obj);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const logOut = () => {
    setLoading(true);
    sessionStorage.removeItem("dueNotificationShown");

    return signOut(auth);
  };

  const userInfo = {
    user,
    emailPassSignup,
    emailPassLogin,
    loading,
    googleAuth,
    githubAuth,
    updateUserProfile,
    logOut,
    resetPassword,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
