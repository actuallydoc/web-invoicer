import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {};

//!TODO - Check box state into the login form state
const LoginModal = ({ cb }: any) => {
  const [checkbox, setCheckbox] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    agree: checkbox,
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
  const handleLogin = () => {
    //Check if all fields are filled
    if (loginForm.username === "" || loginForm.password === "") {
      sendToast("Vsa polja morajo biti izpolnjena!");
      return;
    }
    //Check if email is valid
    if (
      loginForm.username == "" ||
      loginForm.username == null ||
      loginForm.password.length < 4
    ) {
      sendToast("Vsa polja morajo biti izpolnjena!");
      return;
    }
    //Check if password is long enough
    if (loginForm.password.length < 8) {
      sendToast("Geslo mora biti dolgo vsaj 8 znakov!");
      return;
    }
    //Check if user agreed to terms and conditions

    //Send data to the server
    //TODO
    //Show success message
    sendToast("Uspešno ste se prijavili v portal!");
  };
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
    console.log(checkbox);
  };
  const handleLoginForm = (e: any) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    console.log(loginForm);
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
            <h1>Prijava</h1>
          </div>
          <div className="space-y-3">
            <div className="text-black">
              <input
                onChange={handleLoginForm}
                className={"rounded-md p-2 focus:outline-transparent"}
                name="username"
                type="text"
                required
                placeholder="Uporabniško ime"
              />
            </div>
            <div className="text-black">
              <input
                onChange={handleLoginForm}
                className={"rounded-md p-2 focus:outline-transparent"}
                type="password"
                name="password"
                required
                placeholder="Geslo"
              />
            </div>
          </div>
          <div>
            <input
              onChange={handleCheckbox}
              name="rememberMe"
              type="checkbox"
            />
            <label className={"text-white"}>Zapomni si me</label>
          </div>
          <div>
            <a href="#" className={"text-white"}>
              Pozabljeno geslo?
            </a>
          </div>
          <div className="pt-3">
            <button
              onClick={handleLogin}
              className={
                "bg-gray-700 hover:bg-gray-900 text-white text-sm font-bold py-2 px-4 rounded"
              }
            >
              Prijava
            </button>
            <div>{showToast && notify(toastMessage)};</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
