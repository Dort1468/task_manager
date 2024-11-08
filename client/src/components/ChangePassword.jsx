import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("輸入的密碼並不相同");
      return;
    }
    try {
      const rs = await changeUserPassword(data).unwrap();
      toast.success("密碼成功變更");
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            密碼變更
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="請輸入新密碼"
              type="password"
              name="password"
              label="新密碼"
              className="w-full rounded"
              register={register("password", {
                required: "請輸入新密碼!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder="請再次輸入新密碼"
              type="password"
              name="cpass"
              label="確認新密碼"
              className="w-full rounded"
              register={register("cpass", {
                required: "請再次輸入新密碼",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>

          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-800"
                label="儲存"
              />

              <button
                type="button"
                className="bg-white px-5 text-s, font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
              >
                取消
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
