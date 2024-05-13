import { useAuth, AuthProvider } from "./../use-auth-client";
import LoggedIn from "../components/login/LoggedIn";
import LoggedOut from "../components/login/LoggedOut";
import bgImg from "../../../../assets/bg.png";

export default function LoginPage() {
  const { isAuthenticated, identity, principle } = useAuth();
  return (
    <>
      <img
        className="absolute object-cover w-full h-screen"
        src={bgImg}
        alt=""
      />
      {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
    </>
  );
}
w