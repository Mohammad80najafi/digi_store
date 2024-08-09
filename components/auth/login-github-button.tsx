import { UserLoginGithubAction } from "@/actions/user-auth";
import { FaGithub } from "react-icons/fa";

const LoginGithubButton = () => {
  return (
    <div className="">
      <button
        className="flex  justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:gray-800 gap-3"
        onClick={() => {
          UserLoginGithubAction("github");
        }}
      >
        ثبت نام با گیت هاب
        <FaGithub className="text-2xl" />
      </button>
    </div>
  );
};

export default LoginGithubButton;
