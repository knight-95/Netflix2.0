import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignInScreen.css";

const SignInScreen = () => {

  // a big finger pointing to a HTML element
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    // to prevent refreshing page
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
        console.log(authUser);
    }).catch(error => {
      alert(error.message);
    })
    
  };

  const signIn = (e) => {
    e.preventDefault();
    // console.log(emailRef);
    // console.log(emailRef.current.value);
  };


  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen__grey">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignInScreen;
