import { Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiErrorCircle } from "react-icons/bi";
import * as Yup from "yup";
import {
  appColors,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchSignInAction } from "../../app/reducers/auth";
import { AuthEnums } from "../../app/reducers/auth/types";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import logo from "../../assets/images/logo-light.svg";
import Alert, { AlertListItem } from "../../components/Common/Alert";
import { Button } from "../../components/Common/Button";
import { InputWithLabel } from "../../components/Common/Input";
import { Overlay } from "../../components/Common/Overlay";
import { FormGroup, StyledErrorMessage } from "../../components/Common/styled";
import {
  AuthFormWrapper,
  AuthWrapper,
  BannerWrapper,
  StyledAuthForm,
} from "./style";

const validationSchema = Yup.object().shape({
  client_id: Yup.string()
    .required("Обязательное поле")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Логин должен содержать только латинские буквы и цифры"
    ),
  client_secret: Yup.string().required("Обязательное поле"),
});

const SignIn: React.FC = () => {
  const isFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, AuthEnums.fetchSignIn)
  );
  const fetchError = useAppSelector((state) =>
    namedRequestError(state, AuthEnums.fetchSignIn)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [alertList, setAlertList] = useState<AlertListItem[]>([]);

  useEffect(() => {
    if (fetchError)
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchError?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
        },
      ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchError]);

  return (
    <Fragment>
      <Alert alertList={alertList} autoDelete timeout={4000} />
      <AuthWrapper>
        <BannerWrapper>
          <Overlay>
            <div className="logo">
              <img src={logo} alt="LOGO" />
              <span className="vertical-line">|</span>
              <span className="logo__text">Warehouse Management System</span>
            </div>
          </Overlay>
        </BannerWrapper>
        <AuthFormWrapper>
          <div className="form">
            <h3>Добро пожаловать в WMS систему</h3>
            <Formik
              initialValues={{
                client_id: EmptyString,
                client_secret: EmptyString,
              }}
              onSubmit={(values) => {
                dispatch(fetchSignInAction(values));
              }}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <StyledAuthForm onSubmit={handleSubmit}>
                  <h4>Вход в личный кабинет</h4>
                  <FormGroup>
                    <InputWithLabel
                      type="text"
                      name="client_id"
                      label={"Логин"}
                      labelBg={appColors.white}
                      value={values.client_id}
                      onChange={handleChange("client_id")}
                      id="client_id"
                      disabled={false}
                    />
                    {errors && errors.client_id && (
                      <StyledErrorMessage>
                        {errors.client_id}
                      </StyledErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <InputWithLabel
                      type="password"
                      name="client_secret"
                      label={t("Пароль")}
                      labelBg={appColors.white}
                      onChange={handleChange("client_secret")}
                      id="client_secret"
                      value={values.client_secret}
                      disabled={false}
                    />
                    {errors && errors.client_secret && (
                      <StyledErrorMessage>
                        {errors.client_secret}
                      </StyledErrorMessage>
                    )}
                  </FormGroup>

                  <Button
                    colors={{
                      bgColor: appColors.primary,
                      textColor: appColors.white,
                    }}
                    type="submit"
                    disabled={isFetching === "pending"}
                  >
                    {isFetching === "pending" ? "Подождите..." : "Войти"}
                  </Button>
                </StyledAuthForm>
              )}
            </Formik>
          </div>
        </AuthFormWrapper>
      </AuthWrapper>
    </Fragment>
  );
};

export default SignIn;
