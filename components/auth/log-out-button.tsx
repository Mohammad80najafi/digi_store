"use client";

import { UserLogOutAction } from "@/actions/user-auth";

const LogOutButton = () => {
  return (
    <button
      onClick={() => UserLogOutAction()}
      className="bg-white text-black font-semibold font-md rounded-md p-2"
    >
      !برای خروج از حساب کلیک کنید
    </button>
  );
};

export default LogOutButton;
