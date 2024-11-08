import React, { useEffect } from "react";
import Loading from "../components/Loader";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import BallCanvas from "../components/canvas/Ball";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error(errors?.data?.message || errors.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-gradient-to-r from-[#ffebcc] to-[#ffcc80]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-xl font-semibold md:text-base border-gray-600">
              在這裡管理你所有的任務!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span className="text-[#5905ad]">
                Task<span className="text-[#ff884d]">On</span>
              </span>
              <span className="text-black">快速簡潔的私人助理</span>
            </p>
            {/* 動畫區 */}
            {/* <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div> */}
            <div className="cell">
              <BallCanvas />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                歡迎回來!
              </p>
              <p className="text-center text-base text-gray-700">
                保護您的個人隱私安全
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="example@email.com  "
                type="email"
                name="email"
                label="電子信箱/Email"
                className="w-full rounded-full"
                register={register("email", {
                  required: "請輸入您的電子信箱",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="password"
                type="password"
                name="password"
                label="密碼"
                className="w-full rounded-full"
                register={register("password", {
                  required: "請輸入密碼",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                忘記密碼?
              </span>

              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="登入"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
