"use client";
import Link from "next/link";
import Image from "next/image";
import { UserLogOutAction } from "@/actions/user-auth";

const NavbarLogin = ({ session, textColor }: any) => {
  return (
    <div className="">
      {session?.user?.name ? (
        <div className="flex items-center gap-3">
          <Image
            src={session?.user?.image || ""}
            alt="user-image"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            onClick={() => {
              UserLogOutAction();
            }}
          />
          <span>{session?.user?.name}</span>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-primary rounded-md px-4 py-2 text-sm text-black dark:text-white"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default NavbarLogin;
