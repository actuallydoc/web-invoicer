import React, {useEffect} from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
type Props = {};

//!TODO - Check box state into the login form state

type FormSchemaType = z.infer<typeof registerSchema>;
const registerSchema = z.object({
  username: z.string({
    invalid_type_error: "Napačen vnos"
  }).min(3, { message: "Uporabniško ime mora biti dolgo vsaj 3 mesta" }),
  password: z.string({
    invalid_type_error: 'Napačen vnos',
  }).min(8,
      { message: 'Geslo mora biti dolgo vsaj 8 znakov' }),
  email: z.string({
    invalid_type_error: 'Napačen vnos',
  }).email({
    message: 'Email mora biti veljaven',
  }),
  agree: z.boolean({
    invalid_type_error: "Morate se strinjati z uporabo"
  }).default(false)
});
const LoginModal = ({ cb }: any) => {
  const [checkbox, setCheckbox] = useState(false);


  useEffect(() => {
    console.log(registerSchema);
    }, [registerSchema]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const notify = (message: string) => toast(message);
  const sendToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
    registerSchema.parse({ agree: checkbox });

  };
  const handleRegisterForm = (e: any) => {
    registerSchema.parse(e.target.value);
  };


  const {
    register,
    handleSubmit,
      watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
    //Implement register logic
    //With api
    //Toastify message
    toast("Registracija uspešna", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
    })
  }

  return (
      <form className={"box w-96 h-auto font-semibold bg-white rounded-lg  space-y-10"} onSubmit={handleSubmit(onSubmit)}>
    <div className="text-center drop-shadow-2xl overflow-hidden">
      <div className={"text-black"}>
        <div>
          <label className={"block"}>
            <span>Uporabniško ime</span>
            <input disabled={isSubmitting} className={"block border  font-normal text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray" +
                "focus:border-blue-400 focus:ring-0 outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"} type={"text"} {...register('username')} />
            </label>
          {errors.username && <p className={"text-red-500 text-sm"}>{errors.username.message}</p>}
        </div>
        <div>
          <label className={"block"}>
            <span>Email</span>
            <input disabled={isSubmitting} className={"block font-normal  border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray" +
                "focus:border-blue-400 focus:ring-0 outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"} type={"text"} {...register('email')} />
            </label>
          {errors.email && <p className={"text-red-500 text-sm"}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={"block"}>
            <span>Password</span>
            <input  className={"block font-normal  border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray" +
                "focus:border-blue-400 focus:ring-0 outline-none w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"} type={"password"} {...register('password')}
                  disabled={isSubmitting}/>

          </label>
          {errors.password && <p className={"text-red-500 text-sm"}>{errors.password.message}</p>}
        </div>
        <div className={"space-x-3 "}>
          <span>Splošni pogoji</span>
          <input type="checkbox" {...register('agree')} />
          {errors.agree && <p className={"text-red-500 text-sm"}>{errors.agree.message}</p>}
        </div>

        <button disabled={isSubmitting} className={"text-slate-300 border p-2 bg-blue-500 w-1/2 rounded-lg hover:bg-blue-600"} type="submit">Registracija </button>
      </div>
      {/* This is only for debugging purposes to display form data*/}
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  </form>
  );
};

export default LoginModal;
