import React, {useEffect} from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> =async (data) => {
    console.log(data);
    await new Promise(async (resolve) => {
      axios.post("/api/register", data).then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast("Registracija uspešna", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
          cb();
        }
      });
      resolve(undefined);
    });

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
      <form className={"box w-96 h-auto font-semibold bg-white rounded-lg drop-shadow-2xl"} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <button className={"text-black font-bold p-2  rounded-lg hover:bg-slate-200 duration-200"} onClick={cb}>X</button>
        </div>
    <div className="text-center drop-shadow-2xl overflow-hidden">

      <div className={"text-black"}>
        <h1 className={"text-2xl font-bold"}>Registracija</h1>
        <p className={"text-sm pb-5"}>Za uporabo naše aplikacije je potrebna registracija</p>
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
            <span>Geslo</span>
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

        <button disabled={isSubmitting} className={"text-slate-300 border p-2 bg-blue-500 w-1/2 rounded-lg hover:bg-blue-600 duration-200"} type="submit">Registracija </button>
      </div>
      {/* This is only for debugging purposes to display form data*/}
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  </form>
  );
};

export default LoginModal;
