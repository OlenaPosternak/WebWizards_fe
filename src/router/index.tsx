import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom';
import SignUpFirstStep from '@pages/auth/signUp/signUpFirstStep';
import SignUpSecondStep from '@pages/auth/signUp/signUpSecondStep';
import SignUpSecondFormGoogle from '@components/Auth/SignUpForm/SignUpSecondStepFormGoogle';
import ResetPassword from '@pages/auth/resetPassword';
import Login from '@pages/auth/login';
import ForgotPassword from '@pages/auth/forgotPassword';
import Confirmation from '@pages/auth/forgotPassword/confirmation';
import Profile from '@pages/doctor/profile';
import PageWrapper from '@components/PageWrapper';
import Help from '@pages/help';
import { authApi } from 'services/AuthService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { doctorActions } from '@redux/slices/DoctorSlice';
import { signUpSecondStepFormGoogle } from './../pages/auth/signUp/signUpSecondStepGoogle/index';
export const PATH = {
  SIGN_UP_FIRST_STEP: '/sign-up/first-step',
  SIGN_UP_SECOND_STEP: '/sign-up/second-step',
  SIGN_UP_SECOND_STEP_GOOGLE: '/sign-up/second-step/google',
  FORGOT_PASS: '/forgot-pass',
  CONFIRM: '/forgot-pass/confirm',
  RESET_PASS: '/reset-pass',
  LOGIN: '/login',
  HOME: '/',
  EDIT_DOCTOR_PROFILE: '/edit-doctor-profile',
  HELP: '/help',
  DASHBOARD: '/dashboard',
};

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { data: doctor, error, isLoading } = authApi.useGetMeQuery();

  React.useEffect(() => {
    dispatch(doctorActions.getDoctor(doctor));
  }, [doctor]);

  return (
    <PageWrapper>
      <Routes>
        {/* Public Routes */}
        <Route path={PATH.SIGN_UP_FIRST_STEP} element={<SignUpFirstStep />} />
        <Route path={PATH.SIGN_UP_SECOND_STEP} element={<SignUpSecondStep />} />
        <Route
          path={PATH.SIGN_UP_SECOND_STEP_GOOGLE}
          element={<SignUpSecondFormGoogle />}
        />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.RESET_PASS} element={<ResetPassword />} />
        {/* Private Routes */}
        <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
        <Route path={PATH.CONFIRM} element={<Confirmation />} />
        <Route path={PATH.EDIT_DOCTOR_PROFILE} element={<Profile />} />
        <Route path={PATH.HELP} element={<Help />} />
        <Route path={PATH.DASHBOARD} element={<Profile />} /> {/*TODO */}
      </Routes>
    </PageWrapper>
  );
};

export default AppRouter;
