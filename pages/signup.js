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
import { USER_CREATE } from "../helpers/query";
import { useMutation } from "@apollo/client";

export default function Signup() {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const [userInfo, setUserInfo] = useState({
    mail: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

  const [addUser, { data }] = useMutation(USER_CREATE, {
    onCompleted: () => {
      //console.log("QUERY_EVENTS.onCompleted", newData)
      setError(null);
      setSuccessStatus("Success! Redirecting!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
  });

  useEffect(() => {
    userInfo.mail !== "" &&
      userInfo.username !== "" &&
      userInfo.password !== "" &&
      userInfo.passwordConfirm !== "" &&
      setBtnDisabled(false);
  }, [userInfo]);

  const handleUserRegistration = (e) => {
    e.preventDefault();

    if (userInfo.password !== userInfo.passwordConfirm) {
      setError(
        "Password and confirm password does not match. Please try again."
      );
      return;
    }

    addUser({
      variables: {
        email: userInfo.mail,
        username: userInfo.username,
        password: userInfo.password,
      },
    });
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
      </Column>
      <Column rightCol>
        <img
          src="/sign-bg.jpg"
          className="mobile-bg-img"
          alt="Background image"
        />
        <h1>Sign up</h1>
        <span>If you already have an account,</span>
        <span>
          You can <Link href="/">Login here !</Link>
        </span>
        <SignUpForm onSubmit={(e) => handleUserRegistration(e)}>
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
          <SignUpInputLabel htmlFor="email_input">Username</SignUpInputLabel>
          <SignUpInputWrapper>
            <SignUpInput
              id="username_input"
              name="email"
              value={userInfo.username}
              placeholder="Enter your Username"
              onChange={(e) =>
                setUserInfo((prevState) => {
                  return {
                    ...prevState,
                    username: e.target.value,
                  };
                })
              }
            />
            <img
              src="/icons/user.svg"
              alt="Username input field"
              className="icon-user"
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
          <SignUpInputLabel htmlFor="password_input_confirm">
            Confirm Password
          </SignUpInputLabel>
          <SignUpInputWrapper>
            <SignUpInput
              id="password_input_confirm"
              name="password"
              value={userInfo.passwordConfirm}
              type={hidePassword ? "password" : "text"}
              placeholder="Confirm your Password"
              onChange={(e) =>
                setUserInfo((prevState) => {
                  return {
                    ...prevState,
                    passwordConfirm: e.target.value,
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
          {error && <span className="error">{error}</span>}
          <LoginCta disabled={btnDisabled} type="submit">
            {successStatus ? "Success, redirecting!" : "Register"}
          </LoginCta>
        </SignUpForm>
      </Column>
    </LayoutWrap>
  );
}
