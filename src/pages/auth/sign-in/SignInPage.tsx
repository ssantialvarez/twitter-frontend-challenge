import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";

const SignInPage = () => {
  const [error, setError] = useState(false);
  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: httpRequestService.signIn,
    onSuccess: () => {
      navigate("/")
    },
    onError: () => {
      setError(true)
    }
  });

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <Formik
          initialValues={{
            usernameEmail: '',
            password: ''
          }}
          onSubmit={values => {
            //alert(JSON.stringify(values, null, 2));
            mutation.mutate(values)
      
          }}
          
          >
          {formik => ( 
            <form onSubmit={formik.handleSubmit}>
              <div className={"input-container"}>
                <LabeledInput
                  required
                  placeholder={"Enter username or email..."}
                  title={t("input-params.usernameEmail")}
                  error={error}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.usernameEmail}
                  name="usernameEmail"
                  id="usernameEmail"
                />
                <LabeledInput
                  type="password"
                  required
                  placeholder={"Enter password..."}
                  title={t("input-params.password")}
                  error={error}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  name="password"
                  id="password"
                />
                <p className={"error-message"}>{error && t("error.login")}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  type="submit"
                  text={t("buttons.login")}
                  buttonType={ButtonType.FOLLOW}
                  size={"MEDIUM"}
                />
                <Button
                  text={t("buttons.register")}
                  buttonType={ButtonType.OUTLINED}
                  size={"MEDIUM"}
                  onClick={() => navigate("/sign-up")}
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

export default SignInPage;
