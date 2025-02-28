"use client";

import { useSearchParams } from "next/navigation";

import SignIn from "@/components/auth/SignIn";
import { OnSignInPayload } from "@/components/auth/SignIn/SignInForm";

import { REDIRECT_URL_KEY } from "@/constants/app.constant";
import { DEFAULT_HEADERS, endpoints } from "@/constants/endpoint.constant";

import { getMysqlPassword } from "@/utils/password";

const SignInClient = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get(REDIRECT_URL_KEY);

  const handleSignIn = ({
    values, // 2 depth child component
    setSubmitting, // 2 depth child component
    setMessage, // 1 depth child component
  }: OnSignInPayload) => {
    setSubmitting(true);

    console.log("values : ", values);
    console.log("callbackUrl : ", callbackUrl);

    if (!values.otp) {
      const queryString = new URLSearchParams({
        login_id: values.email,
        login_pw: getMysqlPassword(values.password),
      });
      const url = `${endpoints.server.v1.auth.token}?${queryString}`;

      fetch(url, {
        headers: { ...DEFAULT_HEADERS },
        method: "GET",
      }).then((data) => {
        console.log("11111111111111111111111111111111111");
        console.log(data);
      });
    } else {
      fetch(endpoints.server.v1.auth.token, {
        headers: { ...DEFAULT_HEADERS },
        method: "POST",
        body: JSON.stringify({
          login_id: values.email,
          login_pw: getMysqlPassword(values.password),
          otp: values.otp,
        }),
      }).then((data) => {
        console.log("22222222222222222222222222222222");
        console.log(data);
      });
    }

    // 0 depth
    /*
    onSignInWithCredentials(values, callbackUrl || "").then((data) => {
      if (data?.error) {
        setMessage(data.error as string);
        setSubmitting(false);
      }
    });
    */
  };

  return <SignIn onSignIn={handleSignIn} />;
};

export default SignInClient;
