import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { addUser } from "../../service/user.service";

import "./authenticate.css";

import SignIn from "../../components/sign-in";
import SignUp from "../../components/sign-up";

const Authenticate = (props) => {
  const [login, setLogin] = useState(true);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { from } = props.location.state || { from: { pathname: "/" } };

  const loginSuccess = (data) => {
    addUser(data);
    setRedirectToReferrer(true);
  };

  const changeLoginMode = () => {
    setLogin(!login);
  };

  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
    <div className="auth-container">
      {login ? (
        <SignIn changeMode={changeLoginMode} success={loginSuccess} />
      ) : (
        <SignUp changeMode={changeLoginMode} success={loginSuccess} />
      )}
    </div>
  );
};

export default withRouter(Authenticate);
