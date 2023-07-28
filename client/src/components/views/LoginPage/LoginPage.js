import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";

import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import Logo from "../NavBar/Sections/Logo";

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <Formik
      initialValues={{
        // email: initialEmail,
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.id);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/");
              } else {
                setFormErrorMessage("Check out your Account or Password again");
              }
            })
            .catch((err) => {
              setFormErrorMessage("Check out your Account or Password again");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <Container>
            <Logo big width={"240px"} height={"130px"} />
            <Form onSubmit={handleSubmit}>
              <InputItem required>
                <InputLabel>Email</InputLabel>
                <InputBox
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputItem>
              <InputItem required>
                <InputLabel>Password</InputLabel>
                <InputBox
                  id="password"
                  placeholder="패스워드를 입력해주세요"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputItem>

              <InputItem>
                <CheckBox
                  id="rememberMe"
                  type="checkbox"
                  onChange={handleRememberMe}
                  checked={rememberMe}
                />
                <CheckBoxLabel htmlFor="rememberMe">Remember me</CheckBoxLabel>
              </InputItem>

              <LoginButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ minWidth: "100%" }}
                disabled={isSubmitting}
                onSubmit={handleSubmit}
              >
                로그인
              </LoginButton>
            </Form>
            <SignInButton href="/register">회원가입</SignInButton>
          </Container>
        );
      }}
    </Formik>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #111111;
`;

const Form = styled.form`
  width: 350px;
`;

const InputItem = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  color: white;
`;

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  background-color: transparent;
  color: white;
  outline: none;
  border: none;
  border-bottom: 1px solid #a5a5a5;
`;

const CheckBox = styled.input`
  margin-right: 5px;
`;

const CheckBoxLabel = styled.label`
  color: white;
`;

const LoginButton = styled.button`
  color: white;
  background-color: #40a9ff;
  border-radius: 10px;
  height: 40px;
`;

const SignInButton = styled.a`
  color: white;
  margin-top: 20px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default withRouter(LoginPage);
