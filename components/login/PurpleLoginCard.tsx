import { Check, Eye, LockKeyhole, Mail } from 'lucide-react'

const fieldBase =
  'flex h-13 items-center gap-3 rounded-full bg-white pr-5 text-sm text-[#9da3d8] shadow-[0_16px_34px_rgba(91,86,214,0.18)] ring-1 ring-[#eef0ff]'

export default function PurpleLoginCard() {
  return (
    <section
      dir="ltr"
      className="min-h-screen bg-[#edf1fa] px-4 py-10 text-[#232323] sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="relative w-full max-w-[920px] overflow-hidden rounded-[24px] bg-white shadow-[0_34px_56px_rgba(73,92,180,0.28)]">
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="absolute top-0 right-0 h-35 w-[64%] bg-linear-to-br from-[#b92cff] via-[#7a26eb] to-[#3212df]" />
            <div className="absolute right-0 bottom-0 h-34 w-[64%] bg-linear-to-br from-[#a226f1] via-[#7421e8] to-[#3407d6]" />
            <div className="absolute inset-y-0 left-0 w-[52%] bg-white" />
          </div>

          <div className="relative z-10 grid min-h-[420px] grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 md:grid-cols-[1.03fr_0.97fr] md:px-16">
            <form className="mx-auto w-full max-w-[380px]">
              <div className="mb-9 text-center">
                <h1 className="text-3xl font-black tracking-normal">Hello!</h1>
                <p className="mt-1 text-sm text-[#3f3f46]">Sign in to your account</p>
              </div>

              <label className={fieldBase}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[7px] bg-linear-to-br from-[#b13aff] to-[#3f05e6] text-white shadow-[0_10px_20px_rgba(87,41,226,0.34)]">
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#9da3d8]"
                />
              </label>

              <label className={`${fieldBase} mt-8`}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[7px] bg-linear-to-br from-[#b13aff] to-[#3f05e6] text-white shadow-[0_10px_20px_rgba(87,41,226,0.34)]">
                  <LockKeyhole aria-hidden="true" className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#9da3d8]"
                />
                <Eye aria-hidden="true" className="h-5 w-5 text-[#6d21ee]" />
              </label>

              <div className="mt-3 flex items-center justify-between px-6 text-[11px] text-[#858df0]">
                <label className="flex items-center gap-2">
                  <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] border border-[#7425ef] text-[#7425ef]">
                    <Check aria-hidden="true" className="h-2.5 w-2.5" />
                  </span>
                  Remember me
                </label>
                <a href="#" className="transition hover:text-[#4b0fe0]">
                  Forgot password?
                </a>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="h-10 w-41 rounded-full bg-linear-to-r from-[#b730f3] to-[#2d00e9] text-xs font-bold text-white shadow-[0_12px_25px_rgba(88,34,226,0.24)] transition hover:scale-[1.02]"
                >
                  SIGN IN
                </button>
              </div>

              <p className="mt-9 text-center text-xs text-[#7480ff]">
                Don&apos;t have an account?{' '}
                <a href="#" className="font-medium text-[#5720ef]">
                  Create
                </a>
              </p>
            </form>

            <div className="mx-auto max-w-[340px] text-center md:pt-10">
              <h2 className="text-3xl font-black tracking-normal">Welcome Back!</h2>
              <p className="mt-7 text-sm leading-7 text-[#474747]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra magna nisl, at
                posuere sem dapibus sed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
