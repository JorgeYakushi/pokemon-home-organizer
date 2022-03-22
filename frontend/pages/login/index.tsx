import type { NextPage } from "next";
import Link from "next/link";

const Login: NextPage = () => {
  return (
    <div className="container">
      <Link href={`${process.env.BACKEND_API}/auth/google`} passHref>
        <button>LOGIN WITH GOOGLE</button>
      </Link>
    </div>
  );
};

export default Login;
