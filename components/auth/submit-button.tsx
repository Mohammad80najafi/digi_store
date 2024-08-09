"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  text?: string;
  width?: string;
};

const SubmitButton = ({ text, width }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`flex ${width} justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`}
    >
      {pending ? "...در حال انجام" : <span>{text}</span>}
    </button>
  );
};

export default SubmitButton;
