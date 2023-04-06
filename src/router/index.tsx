import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import ExamplePage2 from '@pages/exmaplePage2';
import ExamplePage from '@pages/examplePage';
import SignUp from '@pages/auth/signUp';
import ResetPassword from "@pages/auth/resetPassword";

const PATH = {
  SIGN_UP: "/sign-up",
  HOME: "/",
  FORM: "/form",
  RESET_PASS: "/reset-pass",
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={PATH.HOME} element={<ExamplePage />} />
      <Route path={PATH.FORM} element={<ExamplePage2 />} />
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.RESET_PASS} element={<ResetPassword />} />
    </Route>
  )
);
