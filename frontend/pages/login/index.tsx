import type { NextPage } from "next";
import styles from "@/styles/login.module.scss";
import { LoginButton } from "@/components/login/login-button";
const Login: NextPage = () => {
  return (
    <div className={[styles.login, "center"].join(" ")}>
      <div className={[styles.content, "center"].join(" ")}>
        <LoginButton service={"google"}></LoginButton>
        <LoginButton service={"facebook"}></LoginButton>
        <LoginButton service={"nintendo"}></LoginButton>
        <LoginButton service={"apple"}></LoginButton>
      </div>
    </div>
  );
};

export default Login;
