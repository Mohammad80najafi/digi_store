"use client";

import LightButton from "@/public/website/light-mode-button.png";
import DarkButton from "@/public/website/dark-mode-button.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme!);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="relative">
      <Image
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        width={12}
        src={LightButton}
        alt="light-button"
        className={`absolute right-0 z-10 w-12 cursor-pointer ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        } transition-all duration-300`}
        quality={100}
      />
      <Image
        width={12}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        src={DarkButton}
        alt="light-button"
        className={`w-12 cursor-pointer`}
        quality={100}
      />
    </div>
  );
};

export default DarkMode;
