import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../assets/images/login.png";
import AuthButton from "./components/AuthButton";
import "./auth.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAxiosAuth } from "../../hooks/useAxiosAuth";
import toast from "react-hot-toast";
import useAuthContext from "../../hooks/useAuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const axiosAuth = useAxiosAuth();
  const axiosSecure = useAxiosSecure();
  const { setUser, setUserLoading, setUserToken } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePasswordShow = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (userData) => {
    setUserLoading(true);

    const userInfo = {
      email: userData.email,
      password: userData.password,
    };

    // loggin in the user

    axiosAuth
      .post("/users/login", userInfo)
      .then(async (res) => {
        const authorization = res.headers.authorization;
        const userId = res.headers.userid;

        // setting the tokens on local storage
        localStorage.setItem("authToken", authorization);
        localStorage.setItem("userId", userId);

        // making another request to get the user
        await axiosSecure
          .get(`/users?id=${userId}`)
          .then((res) => {
            toast.success("Logged in Successfully");

            // setting the token and user data to state so that we can enter private route
            setUserToken(res.data.userId);
            setUser(res.data);

            reset();
            navigate("/");
            setUserLoading(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Login Failed");
            setUserLoading(false);
          });
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          setUserLoading(false);
          return toast.error("Invalid Credentials");
        } else {
          setUserLoading(false);
          toast.error("An error occured , Please Try again");
          reset();
        }
      });
  };

  return (
    <section className="h-screen overflow-hidden">
      <div className="flex items-center w-full">
        <div className="h-screen w-1/2">
          <img className="h-full w-full object-cover" src={LoginImg} alt="" />
        </div>
        <div className="h-screen w-[558px] max-h-[911px] overflow-auto mx-auto flex flex-col justify-center py-[40px]">
          <div className="text-center">
            <h1 className="text-[40px] font-semibold mb-[4px]">Login</h1>
            <p className="text-paraColor font-[16px]">
              WelcomeBack,Please Enter your Details to Log In.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="auth--form"
            noValidate
          >
            <div className="mt-[33px]">
              <label className="block" htmlFor="email">
                Email Address
              </label>
              <input
                className="auth-input"
                type="email"
                id="email"
                placeholder="example@gmail.com"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-[14px] font-normalnt- text-red-600 mt-[6px]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mt-[33px]">
              <label className="block" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="auth-input pass-input"
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                />
                <div
                  className="absolute top-1/2 -translate-y-[50%] right-[20px] cursor-pointer password-toggler"
                  onClick={handlePasswordShow}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.80327 12.2526C8.42774 12.6759 9.18882 12.9319 9.99868 12.9319C12.1453 12.9319 13.8919 11.1696 13.8919 9.00369C13.8919 8.18655 13.6382 7.41863 13.2186 6.78855L12.1551 7.86166C12.3307 8.1964 12.4283 8.5902 12.4283 9.00369C12.4283 10.3525 11.3354 11.4551 9.99868 11.4551C9.58887 11.4551 9.19858 11.3567 8.86683 11.1795L7.80327 12.2526ZM16.4288 3.54952C17.8436 4.84907 19.0438 6.60149 19.9415 8.70834C20.0195 8.8954 20.0195 9.11199 19.9415 9.2892C17.8534 14.1921 14.1358 17.1259 9.99868 17.1259H9.98893C8.10575 17.1259 6.30063 16.5056 4.71018 15.3735L2.81725 17.2834C2.67089 17.4311 2.4855 17.5 2.30011 17.5C2.11472 17.5 1.91957 17.4311 1.78297 17.2834C1.53903 17.0373 1.5 16.6435 1.69515 16.358L1.72442 16.3186L16.1556 1.75771C16.1751 1.73802 16.1946 1.71833 16.2044 1.69864L16.2044 1.69863C16.2239 1.67894 16.2434 1.65925 16.2532 1.63957L17.1704 0.714131C17.4631 0.428623 17.9217 0.428623 18.2046 0.714131C18.4974 0.999638 18.4974 1.4722 18.2046 1.75771L16.4288 3.54952ZM6.09836 9.00753C6.09836 9.2635 6.12764 9.51948 6.16667 9.75576L2.55643 13.3984C1.5807 12.2564 0.731804 10.8781 0.0585443 9.29304C-0.0195148 9.11583 -0.0195148 8.89924 0.0585443 8.71218C2.14662 3.80933 5.86419 0.885337 9.99156 0.885337H10.0013C11.3966 0.885337 12.7529 1.22007 14.0018 1.85015L10.7429 5.13841C10.5087 5.09903 10.255 5.0695 10.0013 5.0695C7.84494 5.0695 6.09836 6.83177 6.09836 9.00753Z"
                      fill="#97A0AF"
                    />
                  </svg>
                </div>
              </div>
              {errors.password && (
                <p className="text-[14px] font-normalnt- text-red-600 mt-[6px]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mt-[10px] mb-[50px] form-group">
              <div>
                <input type="checkbox" id="loginCheck" />
                <label htmlFor="loginCheck">Remember me</label>
              </div>
              <Link
                to={"/reset-password"}
                className="text-[16px] font-semibold text-paraLight"
              >
                Forgot password ?
              </Link>
            </div>
            <AuthButton>Log in</AuthButton>
            <div className="relative w-full h-[1.8px] bg-paraColor mt-[40px]">
              <p className="absolute -top-[12px] left-1/2 -translate-x-[50%] px-[13px] bg-white font-semibold text-paraColor">
                Or
              </p>
            </div>
            <p className="text-center mt-[50px] text-paraLight">
              Don’t have an account?{" "}
              <Link to={"/sign-up"} className="font-bold text-headingColor">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
