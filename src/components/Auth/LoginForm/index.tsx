import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { useGoogleLogin } from '@react-oauth/google';
import {IconButton, InputAdornment } from '@mui/material';
import Input from '@components/Input';
import {
  AuthContainer,
  AuthForm,
  AuthGoogleContainer,
  AuthInput,
  AuthInputTitle,
  AuthLinkContainer,
  AuthLinkToLogin,
  AuthSendButton,
  AuthText,
  AuthTitle,
  Form, GoogleImg,
  GoogleText,
  PasswordImg
} from '@components/Auth/styles';
import { ILogin } from '@components/Auth/type';
import visible from "@assets/auth/eye.svg";
import visibleOff from "@assets/auth/eyeSlash.svg";
import google from '@assets/auth/google.svg'
import { email, end, password } from '@constants/auth';
import { LoginSchema } from '@validation/auth.validate';

function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<ILogin>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(LoginSchema),
  });
  useEffect(() => {
    register('password');
  }, []);

  const onSubmit = (data: ILogin) => { };

  const login = useGoogleLogin({ });

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t("Auth.loginTitle")}</AuthTitle>
          <AuthText>{t("Auth.loginText")}</AuthText>
          <AuthInput>
            <AuthInputTitle>{t("Auth.email")}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={email}
              placeholder={t("Auth.enterEmail")??""}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t("Auth.createPassword")}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={password}
              type={showPassword ? "text" : "password"}
              placeholder={t("Auth.enterPassword")??""}
              helperText={errors.password?.message}
              error={Boolean(errors?.password)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    <InputAdornment position={end}>
                      {showPassword ? <PasswordImg src={visible}/> : <PasswordImg src={visibleOff}/>}
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </AuthInput>
          <AuthGoogleContainer onClick={() => login()}>
            <GoogleImg src={google}/>
            <GoogleText>{t("Auth.continueWithGoogle")}</GoogleText>
          </AuthGoogleContainer>
          <AuthSendButton
            disabled={!isValid}
            type='submit'
            value={t("Auth.continue").toString()}
          />
          <AuthLinkContainer>
            {t("Auth.alreadyExistText")}
            <AuthLinkToLogin>{t("Auth.click")}</AuthLinkToLogin>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default LoginForm;