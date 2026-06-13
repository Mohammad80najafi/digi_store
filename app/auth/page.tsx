import type { Metadata } from "next";

import PurpleLoginCard from "@/components/login/PurpleLoginCard";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return <PurpleLoginCard />;
}
