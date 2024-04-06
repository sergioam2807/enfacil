"use client";
import Image from "next/image";
import logo from "../../public/images/login-logo.png";
import user from "../../public/images/loginUser.svg";
import passwordIcon from "../../public/images/loginPassword.svg";
import InputLogin from "./components/login/InputLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // admin@admin.cl
  // admin1234
  const router = useRouter();

  const handleLogin = async () => {
    console.log(email, password);
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      router.push("/inicio");
    } else {
      setError("*Usuario o contraseña incorrectos");
    }
  };
  return (
    <div className="h-screen flex">
      <div className="bg-custom-blue w-1/2 flex-grow flex justify-center items-center">
        <Image src={logo} alt="login" width={430} height={340} />
      </div>

      <div className="flex-grow w-1/2 flex justify-center items-center bg-[#EFF4FC] ">
        <div className="flex flex-col justify-center items-center shadow-lg p-10 rounded-xl bg-custom-blue bg-opacity-20">
          <InputLogin
            type="text"
            placeholder={"Usuario"}
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
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
}
