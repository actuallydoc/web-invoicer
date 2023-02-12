import React from "react";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

//!TODO - Check box state into the login form state
const LoginModal = ({ cb }: any) => {
  const [checkbox, setCheckbox] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    email: "",
    agree: false,
  });
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
    setRegisterForm({ ...registerForm, agree: !registerForm.agree });

    console.log(registerForm);
  };
  const handleRegisterForm = (e: any) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    console.log(registerForm);
  };

  const handleRegistration = () => {
    //Check if all fields are filled
    if (
      registerForm.username === "" ||
      registerForm.password === "" ||
      registerForm.email === ""
    ) {
      sendToast("Vsa polja morajo biti izpolnjena!");
      return;
    }
    //Check if email is valid
    if (!registerForm.email.includes("@")) {
      sendToast("Email ni veljaven!");
      return;
    }
    //Check if password is long enough
    if (registerForm.password.length < 8) {
      sendToast("Geslo mora biti dolgo vsaj 8 znakov!");
      return;
    }
    //Check if user agreed to terms and conditions
    if (!registerForm.agree) {
      sendToast("Morate se strinjati z pogoji uporabe!");
      return;
    }
    //Send data to the server
    //TODO
    //Show success message
    sendToast("Uspešno ste se registrirali!");
  };
  return (
    <div className="text-center drop-shadow-2xl overflow-hidden">
      <div className={" text-black"}>
        <div className="text-white  w-64 h-80 pt-5 bg-slate-500 border-4 border-gray-600 rounded-md">
          <div>
            <button
              onClick={cb}
              className={
                "flex bg-gray-700 hover:bg-gray-900 text-white text-sm text-center mr-auto ml-0 font-bold py-2 px-4 rounded"
              }
            >
              X
            </button>
          </div>
          <div className="pb-3">
            <h1>Registracija</h1>
          </div>
          <div className="space-y-3">
            <div className="text-black">
              <input
                onChange={handleRegisterForm}
                className={"rounded-md p-2 focus:outline-transparent"}
                name="username"
                type="text"
                required
                placeholder="Uporabniško ime"
              />
            </div>
            <div className="text-black">
              <input
                onChange={handleRegisterForm}
                className={"rounded-md p-2 focus:outline-transparent"}
                name="email"
                type="text"
                required
                placeholder="Email"
              />
            </div>
            <div className="text-black">
              <input
                onChange={handleRegisterForm}
                className={"rounded-md p-2 focus:outline-transparent"}
                type="password"
                name="password"
                required
                placeholder="Geslo"
              />
            </div>
          </div>
          <div>
            <input onChange={handleCheckbox} name="agree" type="checkbox" />
            <label className={"text-white"}>Strinjam se s pogoji</label>
          </div>

          <div className="pt-3">
            <button
              onClick={handleRegistration}
              className={
                "bg-gray-700 hover:bg-gray-900 text-white text-sm font-bold py-2 px-4 rounded"
              }
            >
              Registracija
            </button>
            <div>{showToast && notify(toastMessage)};</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
