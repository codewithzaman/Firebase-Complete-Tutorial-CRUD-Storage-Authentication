import { auth, googleProvider } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
export const Auth = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error);
    }
  };
  const LogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error);
    }
  };
  const SignInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const LogOut = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <div className="signup-form-container">
        <h2>Sign Up Form</h2>
        <input
          type="text"
          value={registerEmail}
          placeholder="Email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          value={registerPassword}
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <br /> <br />
        <button onClick={signUp}>Sign up</button> <br />
      </div>
      <br />
      <div className="signup-form-container">
        <h2>Sign in Form</h2>
        <input
          type="text"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br /> <br />
        <button onClick={LogIn}>Sign in</button>
        <br /> <br />
        <h3>Authentication By Google</h3>
        <button onClick={SignInWithGoogle}>Sign in With Google</button>
        <h1>{localStorage.getItem("name")}</h1>
        <h1>{localStorage.getItem("email")}</h1>
        <img src={localStorage.getItem("profilePic")} alt="" />
      </div> <br/> <br/>
      <div className="signup-form-container">
      <h4>User Logged In</h4>
      {user?.email}
      <button onClick={LogOut}>Sign Out</button>
      </div>
      <br/>
    </div>
  );
};
