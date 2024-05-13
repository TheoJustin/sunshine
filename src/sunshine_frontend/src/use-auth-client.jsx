import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  canisterId,
  createActor,
  sunshine_backend,
} from "../../declarations/sunshine_backend";
import { canisterId as internetIdentityCanisterId } from "../../declarations/internet_identity";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://${internetIdentityCanisterId}.localhost:4943/`,
  },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);

  const login = () => {
    console.log(internetIdentityCanisterId);
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal();
    setPrincipal(principal);

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setUser(actor);
  }

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient);
  }

  async function checkAuthentication() {
    const check = await authClient.isAuthenticated();

    // get user
    const checkUser = await sunshine_backend.getUserById(principal);

    // console.log(authClient.isAuthenticated())
    if (!check || checkUser.err) {
      navigate(`/login`);
    }
    return check;
  }

  async function getUser() {
    const loggedInUser = await user.getUserById(principal);
    return loggedInUser;
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
    user,
    checkAuthentication,
    getUser,
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
