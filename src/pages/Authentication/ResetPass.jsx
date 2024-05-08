import AuthButton from "./components/AuthButton";
import "./auth.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BgImg from "../../assets/images/header-bg.png";
import { useAxiosAuth } from "../../hooks/useAxiosAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const axiosAuth = useAxiosAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (userData) => {
    const email = userData.email;
    const password = userData.password;

    // changing the password
    axiosAuth
      .put(`/users/password-reset?email=${email}&password=${password}`)
      .then((res) => {
        console.log(res);

        toast.success("Password Successfully Reset Done");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Password Reset Unsuccessfull ");
      });
  };
  return (
    <section className="rest--pass--section">
      <div
        className="w-full h-[174px] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BgImg})` }}
      ></div>
      <div>
        <div className="main--content--upper -mt-[60px] overflow-hidden w-[1320px] mx-auto rounded-[24px]">
          <div className="main--content--wrapperV2 p-7 bg-[#fff] overflow-auto">
            <div className="w-[607px] mx-auto py-[10px]">
              <div className="reset--icon mx-auto mb-[30px] h-[88px] w-[88px] rounded-[24px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="61"
                  height="62"
                  viewBox="0 0 61 62"
                  fill="none"
                >
                  <path
                    d="M52.4277 34.1494C52.4277 46.3188 42.5512 56.1953 30.3818 56.1953C18.2125 56.1953 8.33594 46.3188 8.33594 34.1494C8.33594 21.9801 18.2125 12.1035 30.3818 12.1035C42.5512 12.1035 52.4277 21.9801 52.4277 34.1494Z"
                    stroke="white"
                    strokeWidth="4.53516"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30.375 20.9221V33.5198"
                    stroke="white"
                    strokeWidth="4.53516"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.8125 5.80493H37.9297"
                    stroke="white"
                    strokeWidth="4.53516"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[36px] font-semibold text-[#1f1f1f] mb-[12px] text-center">
                Reset your Password
              </h1>
              <p className="text-[18px] font-normal text-paraLight text-center">
                Strong passwords include numbers, letters, and punctuation
                marks.{" "}
              </p>

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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                        pattern: {
                          value: /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{4,}$/,
                          message:
                            "Password must be at least 4 characters and contain at least one digit, one uppercase letter, and one special character.",
                        },
                        required: "Password is required.",
                      })}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-[50%] right-[20px] cursor-pointer password-toggler"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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
                {/* confirm pass  */}
                <div className="mt-[33px] mb-[50px]">
                  <label className="block" htmlFor="password">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className="auth-input pass-input"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      id="Confirmpassword"
                      placeholder="********"
                      {...register("Confirmpassword", {
                        pattern: {
                          value: /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{4,}$/,
                          message:
                            "Confirmpassword must be at least 4 characters and contain at least one digit, one uppercase letter, and one special character.",
                        },
                        required: "Confirmpassword is required.",
                      })}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-[50%] right-[20px] cursor-pointer password-toggler"
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
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
                <AuthButton>Reset Password</AuthButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPass;
