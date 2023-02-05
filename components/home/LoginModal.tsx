import React from "react";
import { useState } from "react";
type Props = {};

//!TODO - Check box state into the login form state
const LoginModal = ({ close }: any) => {
  const [isclose, setisClose] = useState(close);
  const [checkbox, setCheckbox] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    rememberMe: checkbox,
  });
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
    console.log(checkbox);
  };
  const handleLoginForm = (e: any) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    console.log(loginForm);
  };
  return (
    <div className="text-center drop-shadow-2xl">
      <div className={" text-black"}>
        <div className="text-white  w-64 h-80 pt-5 bg-slate-500 border-4 border-gray-600 rounded-md">
          <div>
            <button
              onClick={close}
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
              className={
                "bg-gray-700 hover:bg-gray-900 text-white text-sm font-bold py-2 px-4 rounded"
              }
            >
              Prijava
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
