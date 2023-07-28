import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import Logo from "../NavBar/Sections/Logo";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

// import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        lastName: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              toast.error(response.payload.err.errmsg, { autoClose: 1500 });
            }
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
            {/* <Title level={2}>Log In</Title> */}
            <Form onSubmit={handleSubmit}>
              <InputItem required>
                <InputLabel>Name</InputLabel>
                <InputBox
                  id="name"
                  placeholder="이름을 입력해주세요"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputItem>
              <InputItem required>
                <InputLabel>Last Name</InputLabel>
                <InputBox
                  id="lastName"
                  placeholder="성을 입력해주세요"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputItem>

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

              <InputItem required>
                <InputLabel>Comfirm</InputLabel>
                <InputBox
                  id="confirmPassword"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputItem>

              <LoginButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ minWidth: "100%" }}
                disabled={isSubmitting}
                onSubmit={handleSubmit}
              >
                회원가입
              </LoginButton>
            </Form>
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

const LoginButton = styled.button`
  color: white;
  background-color: #40a9ff;
  border-radius: 10px;
  height: 40px;
`;

export default RegisterPage;
