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
import { StyledH3, StyledP } from "../../../components/common/text";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { StyledPError } from "../../../components/common/text/PError";



const SignUpPage = () => {
  const [error, setError] = useState(false);
  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: httpRequestService.signUp,
    onSuccess: (res) => {
      navigate("/")
    },
    onError: () => {
      setError(true)
    }
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    //password: Yup.string().required('Required').matches(/(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$)/, 'password is too weak. Must contain ...'),
    validationSchema: Yup.object({
      name: Yup.string()
        .max(35, 'Must be 35 characters or less')
        .required('Required'),
      username: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .matches(/(^[A-Za-z][A-Za-z0-9]*$)/, 'Username must not contain any white-space.')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password is too short. Must be 8 characters or more').required('Required'),
      confirmPassword: Yup.string().required('Required').test(
        'compare-passwords',
        'Passwords must be the same.',
        (value, testContext) => {
          return value === testContext.parent.password
        }
      )

    }),
    onSubmit: values => {
      //alert(JSON.stringify(values, null, 2));
      mutation.mutate(values)

    },
  });

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={"input-container"}>
              <LabeledInput
                required
                placeholder={"Enter name..."}
                title={t("input-params.name")}
                error={error || (formik.touched.name && formik.errors.name) ? true : false}
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
                required
                placeholder={"Enter username..."}
                title={t("input-params.username")}
                error={error || (formik.touched.username && formik.errors.username) ? true : false}
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
                required
                placeholder={"Enter email..."}
                title={t("input-params.email")}
                error={error}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? <StyledPError>{formik.errors.email}</StyledPError> : null}
              <LabeledInput
                type="password"
                id="password"
                name="password"
                required
                placeholder={"Enter password..."}
                title={t("input-params.password")}
                error={error}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}

              />
              {formik.touched.password && formik.errors.password ? <StyledPError>{formik.errors.password}</StyledPError> : null}
              <LabeledInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder={"Confirm password..."}
                title={t("input-params.confirm-password")}
                error={error}
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
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
