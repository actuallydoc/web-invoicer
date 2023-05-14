import Head from "next/head";
import { useEffect, useState } from "react";
import LoginModal from "@/components/home/LoginModal";
import RegisterModal from "@/components/home/RegisterModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/footer/Footer";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const { data: session } = useSession();
  const handleLoginBtn = () => {
    setLogin(!login);
    console.log(login);
  };
  const closeLogin = () => {
    setLogin(false);
  };
  const closeRegister = () => {
    setRegister(false);
  };
  const handleRegisterBtn = () => {
    setRegister(!register);
  };

  const handleSignin = () => {
    signIn();
  };
  const handleSignout = () => {
    signOut();
  };
  const handleRedirect = () => {
    window.location.href = "/dashboard";
  };
  return (
    <>
      <Head>
        <title>Web Invoicer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={" text-black flex flex-col h-screen justify-between"}>
        <div className="justify-center">
          <div className="box-border   p-4 border-b-2 text-center mb-3">
            <div>
              <h1 className={"text-4xl"}>
                Pozdravljeni na Web Invoicer Aplikaciji
              </h1>
            </div>
            <div>
              <p className={"text-2xl"}>
                Za začetek izberite eno od možnosti v meniju
              </p>
            </div>
          </div>
          <div className="flex space-x-5 justify-center">
            <div>
              {!session ? (
                <button
                  onClick={handleSignin}
                  className={
                    "bg-blue-500   hover:transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  }
                >
                  Login
                </button>
              ) : (
                <div>
                  <div className="">
                    <div className="text-center">
                      <img src={session?.user?.image as string} width={32} height={32} className="rounded-2xl" alt="" />
                    </div>
                    <div className="">
                      <p className="text-xl">{session?.user?.name as string}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleSignout}
                      className={
                        "bg-blue-500   hover:transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      }
                    >
                      Log out
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={handleRedirect}
                      className={
                        "bg-blue-500   hover:transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      }
                    >
                      Dashboard
                    </button>
                  </div>

                </div>
              )}
            </div>
          </div>

        </div>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnHover={false}
          theme={"dark"}
          limit={3}
        />
        <div>
          <div className="">
            <Footer />
          </div>
        </div>
      </main >
    </>
  );
}
