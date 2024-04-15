"use client";
import Image from "next/image";
import React from "react";
import logout from "@/../public/images/logout.svg";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();

    // Clear cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex gap-1 items-center font-medium text-custom-blue hover:bg-custom-blue p-2 rounded-lg hover:text-white"
    >
      Salir
      <Image src={logout} alt="logout" width={17} height={17} />
    </button>
  );
};

export default LogoutButton;
