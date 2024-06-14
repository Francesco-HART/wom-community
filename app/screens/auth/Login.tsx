import { selectIsAuthUserAuthenticated } from "@/lib/auth/reducer";
import { authenticateWithGithub } from "@/lib/auth/usecases/authenticate-with-github.usecase";
import { authenticateWithGoogle } from "@/lib/auth/usecases/authenticate-with-google.usecase";
import { AppDispatch } from "@/lib/create-store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Login = ({ navigation }: { navigation: any }) => {
  const [gooleAuthentificating, setGoogleAuthenticating] =
    useState<boolean>(false);
  const [githubAuthentificating, setGithubAuthenticating] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthUserAuthenticated = useSelector(selectIsAuthUserAuthenticated);
  const authWithGoogle = () => {
    setGoogleAuthenticating(true);
    dispatch(authenticateWithGoogle())
      .unwrap()
      .finally(() => setGoogleAuthenticating(false));
  };

  const authWithGithub = () => {
    setGithubAuthenticating(true);
    dispatch(authenticateWithGithub())
      .unwrap()
      .finally(() => setGithubAuthenticating(false));
  };

  const goToLogin = () => navigation.replace("Login");

  const focusOnTransitionEnd = () => {
    return navigation.addListener("transitionEnd", (e: any) => {
      if (isAuthUserAuthenticated) {
        goToLogin();
        return null;
      }
    });
  };
  useEffect(() => {
    return focusOnTransitionEnd();
  }, [focusOnTransitionEnd]);

  return <></>;
};
