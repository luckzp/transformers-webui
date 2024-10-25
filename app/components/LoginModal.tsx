import React from "react";
import { Modal, Button } from "antd";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { useAuth } from "../contexts/AuthContext";
import axios from "@/utils/axios";

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onGoogleLoginSuccess: (name: string) => void; // Add this prop
}

const onFinish = () => {
  axios
    .get("/api/note")
    .then((res) => {
      if (res.status != 200) {
        alert(res.statusText);
        return;
      }
      alert(res.data);
    })
    .catch((err) => {
      alert(err);
    });
};

const LoginModal: React.FC<LoginModalProps> = ({
  isVisible,
  onClose,
  onLogin,
  onGoogleLoginSuccess,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onLogin(email, password);
  };

  return (
    <Modal open={isVisible} onCancel={onClose} footer={null} centered>
      <div className="flex flex-col">
        <LoginForm
          onSubmit={handleSubmit}
          onGoogleLoginSuccess={onGoogleLoginSuccess}
        />
      </div>
    </Modal>
  );
};

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleLoginSuccess: (name: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLoginSuccess,
}) => {
  const { login } = useAuth(); // Add this hook

  const toLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const userInfo = await axios.post("/auth/google", {
        code: codeResponse.code,
      });
      console.log(userInfo);
      const name = userInfo.data.name;
      login(name);
      onGoogleLoginSuccess(name);
      onFinish();
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="my-auto mb-auto flex flex-col  w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:max-w-[450px]">
      <h1 className="text-[32px] font-bold text-zinc-950 dark:text-white">
        Sign In
      </h1>
      <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
        Enter your email and password to sign in!
      </p>
      <div className="mt-2">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-zinc-950 py-6 dark:text-white"
          onClick={toLogin}
        >
          <img
            src="/google.svg"
            alt="google"
            className="w-[24px] h-[24px] mr-2"
          />
          google
        </button>

        <Divider />
        <form onSubmit={onSubmit} className="mb-4">
          <div className="grid gap-2">
            <div className="grid gap-1">
              <InputField
                label="Email"
                id="email"
                type="email"
                placeholder="name@example.com"
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <Button
              className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
              htmlType="submit"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Divider: React.FC = () => (
  <div className="relative my-4">
    <div className="relative flex items-center py-1">
      <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
      <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
    </div>
  </div>
);

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
}) => (
  <>
    <label className="text-zinc-950 dark:text-white" htmlFor={id}>
      {label}
    </label>
    <input
      className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
      id={id}
      placeholder={placeholder}
      type={type}
      autoCapitalize="none"
      autoComplete={type === "email" ? "email" : "current-password"}
      autoCorrect="off"
      name={id}
    />
  </>
);

export default LoginModal;
