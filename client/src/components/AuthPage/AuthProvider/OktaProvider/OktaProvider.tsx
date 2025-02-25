import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const OktaProvider = () => {
  const { authState, oktaAuth } = useOktaAuth();

  if (authState!.isPending) return <div>Loading...</div>;

  const login = async () => oktaAuth.signInWithRedirect();

  return authState!.isAuthenticated ? (
    <button onClick={() => oktaAuth.signOut()}>Logout</button>
  ) : (
    <button onClick={login}>Login</button>
  );
};

export default OktaProvider;
