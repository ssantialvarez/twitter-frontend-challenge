import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import * as Yup from 'yup';
import { useHttpRequestService } from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { StyledPError } from "../../../components/common/text/PError";


const SignUpPage = () => {
  const [errorUsername, setErrorUsername] = useState(false);
  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: httpRequestService.signUp,
    onSuccess: () => {
      navigate("/")
    },
    onError: () => {
      setErrorUsername(true)
    }
  })
  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <Formik
           validateOnChange={false}
           validateOnBlur={false}
           initialValues={{
            username: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          //password: Yup.string().required('Required').matches(/(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$)/, 'password is too weak. Must contain ...'),
          validationSchema={Yup.object({
            name: Yup.string()
              .max(35, 'Must be 35 characters or less')
              .required('Required'),
            username: Yup.string()
              .max(25, 'Must be 25 characters or less')
              .matches(/(^[A-Za-z][A-Za-z0-9]*$)/, 'Username must not contain any white-space.')
              .required('Required').test(
                'user-exists',
                'Username already exists.',
                async (value) => {
                  return !(await httpRequestService.checksEmailOrUsername(value))
                }
              ),
            email: Yup.string().email('Invalid email address').required('Required').test(
              'email-exists',
              'Email has already been taken.',
              async (value) => {
                return !(await httpRequestService.checksEmailOrUsername(value))
              }
            ),
            password: Yup.string().min(8, 'Password is too short. Must be 8 characters or more').required('Required'),
            confirmPassword: Yup.string().required('Required').test(
              'compare-passwords',
              'Passwords must be the same.',
              (value, testContext) => {
                return value === testContext.parent.password
              }
            )
            })}
            onSubmit= {values => {
              //alert(JSON.stringify(values, null, 2));
              mutation.mutate(values)
        
            }}
          >
          {formik => ( 
          
          <form onSubmit={formik.handleSubmit}>
            <div className={"input-container"}>
              <LabeledInput
                placeholder={"Enter name..."}
                title={t("input-params.name")}
                error={formik.touched.name && formik.errors.name ? true : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                id="name"
              />
              {formik.touched.name && formik.errors.name ? 
                <StyledPError>{formik.errors.name}</StyledPError> 
                : null}
              <LabeledInput                
                placeholder={"Enter username..."}
                title={t("input-params.username")}
                error={errorUsername || (formik.touched.username && formik.errors.username) ? true : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                name="username"
                id="username"
              />
              {formik.touched.username && formik.errors.username ? <StyledPError>{formik.errors.username}</StyledPError> : null}
              <LabeledInput
                type="email"
                id="email"
                name="email"
                placeholder={"Enter email..."}
                title={t("input-params.email")}
                error={ formik.touched.password && formik.errors.email ? true : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? <StyledPError>{formik.errors.email}</StyledPError> : null}
              <LabeledInput
                type="password"
                id="password"
                name="password"
                placeholder={"Enter password..."}
                title={t("input-params.password")}
                error={formik.touched.password && formik.errors.password ? true : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}

              />
              {formik.touched.password && formik.errors.password ? <StyledPError>{formik.errors.password}</StyledPError> : null}
              <LabeledInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={"Confirm password..."}
                title={t("input-params.confirm-password")}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <StyledPError>{formik.errors.confirmPassword}</StyledPError> : null}
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "10px 1px" }}>
              <Button
                type="submit"
                text={t("buttons.register")}
                buttonType={ButtonType.FOLLOW}
                size={"MEDIUM"}
              />
              <Button
                text={t("buttons.login")}
                buttonType={ButtonType.OUTLINED}
                size={"MEDIUM"}
                onClick={() => navigate("/sign-in")}
              />
            </div>
            </form>
            )}
            </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
