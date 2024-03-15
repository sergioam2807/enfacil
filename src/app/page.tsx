"use client";
import Image from "next/image";
import logo from "../../public/images/login-logo.png";
import user from "../../public/images/loginUser.svg";
import passwordIcon from "../../public/images/loginPassword.svg";
import InputLogin from "./components/login/InputLogin";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Login/Authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    console.log(response);
    if (response.ok) {
      // handle successful login
    } else {
      // handle error
    }
  };
  return (
    <div className="h-screen flex">
      <div className="bg-custom-blue w-1/2 flex-grow flex justify-center items-center">
        <Image src={logo} alt="login" width={430} height={340} />
      </div>

      <div className="flex-grow w-1/2 flex justify-center items-center ">
        <div className="flex flex-col justify-center items-center h-full">
          <InputLogin
            type="text"
            placeholder="Usuario"
            icon={user}
            width={20}
            height={20}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLogin
            type="password"
            placeholder="Contraseña"
            icon={passwordIcon}
            width={16}
            height={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-custom-blue text text-white font-bold text-center p-2 border rounded w-64 h-12"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
