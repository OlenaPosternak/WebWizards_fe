import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
import Input from '@components/Input';
import {
  AuthContainer,
  AuthForm,
  AuthInput,
  AuthInputTitle,
  AuthLinkContainer,
  AuthLink,
  AuthSendButton,
  AuthText,
  AuthTitle,
  Form,
  PasswordImg,
  AuthForgotPasswordContainer,
} from '@components/Auth/styles';
import { ISignUp } from '@components/Auth/type';
import visible from '@assets/auth/eye.svg';
import visibleOff from '@assets/auth/eyeSlash.svg';
import { email, end, error, password } from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import { PATH } from '@router/index';
import GoogleLoginButton from './GoogleLogin';
import { ToastContainer } from 'react-toastify';
import { AuthLoginDto } from 'api/auth/auth.api';
import { toast } from 'react-toastify';
import { loginQuery } from '@redux/slices/auth/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from '@redux/store';

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { LoginSchema } = signUpSchema();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: yupResolver(LoginSchema),
  });
  useEffect(() => {
    register('password');
  }, []);

  const onSubmit = (data: ISignUp) => {
    dispatch(loginQuery(data)).then((res) => {
      if (error in res && res.error) {
        toast.error(
          'Sorry, something was wrong! Check your email and password!',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else {
        navigate(PATH.DASHBOARD);
      }
    });
  };

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t('Auth.loginTitle')}</AuthTitle>
          <AuthText>{t('Auth.loginText')}</AuthText>
          <AuthInput>
            <AuthInputTitle>{t('Auth.email')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={email}
              placeholder={t('Auth.enterEmail') ?? ''}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t('Auth.passwordLogin')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={password}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Auth.enterPassword') ?? ''}
              helperText={errors.password?.message}
              error={Boolean(errors?.password)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    <InputAdornment position={end}>
                      {
                        <PasswordImg
                          src={showPassword ? visible : visibleOff}
                        />
                      }
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </AuthInput>
          <AuthForgotPasswordContainer>
            <AuthLink to={PATH.FORGOT_PASS}>
              {t('Auth.forgotPasswordLink')}
            </AuthLink>
          </AuthForgotPasswordContainer>
          <GoogleLoginButton />
          <AuthSendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.continue') ?? ''}
          />
          <AuthLinkContainer>
            {t('Auth.haventAnAccount')}
            <AuthLink to={PATH.SIGN_UP}>{t('Auth.click')}</AuthLink>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
      <ToastContainer />
    </AuthContainer>
  );
}

export default LoginForm;
