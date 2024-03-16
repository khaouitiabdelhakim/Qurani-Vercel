"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// firebase.js (Initialize Firebase)
import {
  push as upload,
  query,
  ref,
  set,
  get,
  child,
  orderByChild,
  equalTo,
} from "@firebase/database";
import { database } from "../../../configs/firebase.config";
import { Team } from "@/models/Team";



const SigninPage = () => {
  const { push } = useRouter();

  

  const [isSignIn,setSignIn] = useState(false)

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData) {
        push("/team");
      console.log("user data: ", userData);
      } else {
        console.log("No user data found");
      }
    } else {
      console.log("No user data found 2");
    }
  }, [push]);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000); // Set timeout for 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [error]);

  const handleSignIn = async (e) => {
    
    e.preventDefault();
    if(login.length == 0 || password.length == 0) {
      setSignIn(false)
      return;
    }
    setSignIn(true)
    try {
      console.log("sign in ...");
      console.log("handle: ", login, " password: ", password);
      const usersRef = ref(database, "fintech/2024/teams");

      // Construct the query to filter nodes by the 'login' field
      const myQuery = query(usersRef, orderByChild("login"), equalTo(login));

      // Retrieve the data that satisfies the filtered query
      const snapshot = await get(myQuery);

      // Check if snapshot contains any data
      if (snapshot.exists()) {
        // Retrieve the first object from the userData object
        const firstUser = Object.values(snapshot.val())[0] as Team;

        console.log(firstUser);

        // Check if firstUser exists
        if (firstUser) {
          // Check if the retrieved user data's password matches the provided password
          if (firstUser.password.toString() === password) {
            // Successful authentication
            console.log("successful sign-in", firstUser);
            localStorage.setItem("userData", JSON.stringify(firstUser));
            push("/team");
            setSignIn(false)
          } else {
            console.log("Invalid password");
            setSignIn(false)
            setError(true);
            setMessage("Invalid password");
          }
        } else {
          console.log("No user found");
          setSignIn(false)
          setError(true);
          setMessage("No user found");
        }
      } else {
        console.log("No user found");
        setSignIn(false)
        setError(true);
        setMessage("No user found");
      }
    } catch (error) {
      console.log(error.message);
      setSignIn(false)
      setError(true);
      setMessage(error.message);
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        
        <div className="container">

        {error && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
          id="toast-warning"
          className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            {message || "An error occurred."}
          </div>
        </div>
      )}

          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign In To Your Team
                </h3>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Team Space
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={handleSignIn}>
                  <div className="mb-8">
                    <label
                      htmlFor="login"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Team Handle
                    </label>
                    <input
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      type="text"
                      name="login"
                      placeholder="Enter Your Team's Handle"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 flex w-full items-center justify-center"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                      }}
                    >
                      {isSignIn && (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="me-3 inline h-4 w-4 animate-spin text-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      Sign In
                    </button>
                    
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Have Any Problem?{" "}
                  <Link href="/" className="text-primary hover:underline">
                    Contact Admin
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
