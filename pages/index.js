import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Column,
  LayoutWrap,
  LoginCta,
  LogoWrapper,
  SignUpCheckbox,
  SignUpCheckboxWrapper,
  SignUpForm,
  SignUpInput,
  SignUpInputLabel,
  SignUpInputWrapper,
  SignUpRow,
} from "../styles/Global";
import { QUERY_USERS } from "../helpers/query";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUsername } from "../state/slices/globalSlice";

export default function Signin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const [userInfo, setUserInfo] = useState({ mail: "", password: "" });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [successStatus, setSuccessStatus] = useState(false);

  useEffect(() => {
    userInfo.mail !== "" && userInfo.password !== "" && setBtnDisabled(false);
  }, [userInfo]);

  const { data } = useQuery(QUERY_USERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (newData) => {
      setUsers(newData.users);
      /* console.log("QUERY_USERS.onCompleted", newData.users); */
    },
    //onError: () => console.log("err"),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const userResult = users?.find(
      (user) =>
        user.email === userInfo.mail && user.password === userInfo.password
    );

    if (userResult !== undefined) {
      setError(null);
      dispatch(setUsername(userResult.username));
      setSuccessStatus(true);
      setTimeout(() => {
        router.push("/dash");
      }, 2000);
      return;
    } else {
      setError("Wrong email or password.");
    }
  };

  return (
    <LayoutWrap>
      <LogoWrapper>
        <img src="/icons/logo.svg" alt="Trading Bible logo" />
        <h4>Trading Bible</h4>
      </LogoWrapper>
      <Column leftCol>
        <img src="/sign-bg.jpg" className="bg-img" alt="Background image" />
        <div>
          <h2>Welcome te</h2>
          <h1>Trading Bible</h1>
        </div>
        <span className="status">You must sign in to use the application</span>
      </Column>
      <Column rightCol>
        <img
          src="/sign-bg.jpg"
          className="mobile-bg-img"
          alt="Background image"
        />
        <h1>Sign In</h1>
        <span>If you don’t have an account register</span>
        <span>
          You can <Link href="/signup">Register here !</Link>
        </span>
        <SignUpForm onSubmit={(e) => onSubmit(e)}>
          <SignUpInputLabel htmlFor="email_input">Email</SignUpInputLabel>
          <SignUpInputWrapper>
            <SignUpInput
              id="email_input"
              name="email"
              value={userInfo.mail}
              placeholder="Enter your email address"
              onChange={(e) =>
                setUserInfo((prevState) => {
                  return {
                    ...prevState,
                    mail: e.target.value,
                  };
                })
              }
            />
            <img
              src="/icons/email.svg"
              alt="Email input field"
              className="icon-email"
            />
          </SignUpInputWrapper>
          <SignUpInputLabel htmlFor="password_input">Password</SignUpInputLabel>
          <SignUpInputWrapper>
            <SignUpInput
              id="password_input"
              name="password"
              value={userInfo.password}
              type={hidePassword ? "password" : "text"}
              placeholder="Enter your Password"
              onChange={(e) =>
                setUserInfo((prevState) => {
                  return {
                    ...prevState,
                    password: e.target.value,
                  };
                })
              }
            />
            <img
              src="/icons/password.svg"
              alt="Password input field"
              className="icon-pass"
            />
            <img
              src="/icons/hide-password.svg"
              alt="Hide password"
              className="icon-hide"
              onClick={() => setHidePassword(!hidePassword)}
            />
          </SignUpInputWrapper>
          <SignUpRow>
            <SignUpCheckboxWrapper>
              <SignUpCheckbox id="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </SignUpCheckboxWrapper>
            <Link href="/signup">Forgot Pasword?</Link>
          </SignUpRow>
          {error && <span className="error">{error}</span>}
          <LoginCta disabled={btnDisabled} type="submit">
            {successStatus ? "Successful login!" : "Login"}
          </LoginCta>
        </SignUpForm>
      </Column>
    </LayoutWrap>
  );
}
