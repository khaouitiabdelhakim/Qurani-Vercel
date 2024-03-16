"use client";
import { useState } from "react";
import { getUnixTime } from "date-fns";
import {
  ref,
  push as dbPush,
  set,
  update,
  onValue,
  off,
  get,
} from "@firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import { storage } from "../../configs/firebase.config"; // Import Firebase storage
import { database } from "../../configs/firebase.config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UploadData } from "@/models/uploadData";
import { FileDate } from "@/models/FileDate";

const TeamProfile = () => {
  const { push } = useRouter();

  const [isRules, setRulesGot] = useState(false);

  const [rules, setRules] = useState({
    upload_01: { start: {} as FileDate, end: {} as FileDate },
    upload_02: { start: {} as FileDate, end: {} as FileDate },
    upload_03: { start: {} as FileDate, end: {} as FileDate },
    upload_04: { start: {} as FileDate, end: {} as FileDate },
  });

  const [filesData, setFilesData] = useState({} as UploadData);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);

  const [error, setError] = useState("");
  const [isGettingStatus, setStatus] = useState(true);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccesMessages] = useState("");
  const [failure, setFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const [uploading, setUploading] = useState(false);

  function parseFileDateString(dateString: string): FileDate | null {
    const dateParts = dateString.split(":");

    // Check if the string has exactly 5 parts (year, month, day, hour, minute)
    if (dateParts.length !== 5) {
      return null; // Return null if the format is incorrect
    }

    // Convert each part to a number
    const [yearStr, monthStr, dayStr, hourStr, minuteStr] = dateParts;
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    // Validate parsed numbers
    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      isNaN(hour) ||
      isNaN(minute)
    ) {
      return null; // Return null if any part is not a valid number
    }

    return { year, month, day, hour, minute };
  }

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) return;

    const userData = JSON.parse(userDataString);
    if (!userData) return;
    setStatus(true);
    // Reference to 'participation' node in your Firebase Realtime Database
    const uploadRef = ref(
      database,
      `fintech/2024/teams/${userData.id}/uploads`,
    );

    // Listen for changes to the 'participation' node
    onValue(uploadRef, (snapshot) => {
      const data = snapshot.val(); // Retrieve the data from the snapshot
      if (data) {
        // Map the result to true if URL exists, false otherwise
        const mappedData = {
          ...data,
          upload_01: !!data.upload_01,
          upload_02: !!data.upload_02,
          upload_03: !!data.upload_03,
          upload_04: !!data.upload_04,
        };
        setFilesData(mappedData as UploadData); // Set the fetched data to state
        setStatus(Object.values(mappedData).every((value) => value)); // Set status based on whether all uploads are present
        console.log(mappedData);
      }
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      // Stop listening for changes when component unmounts
      off(uploadRef);
    };
  }, []); // Run this effect only once after component mounts

  useEffect(() => {
    const rulesRef = ref(database, `fintech/2024/uploadRules`);

    const fetchParticipationDetails = async () => {
      try {
        const snapshot = await get(rulesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Initialize an object to store parsed rules
          const parsedRules: any = {};

          // Iterate over each upload rule and parse date strings
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              const uploadRule = data[key];
              parsedRules[key] = {
                start: parseFileDateString(uploadRule.start),
                end: parseFileDateString(uploadRule.end),
              };
            }
          }

          setRules(parsedRules);
          console.log("Rules fetched successfully");
          console.log(parsedRules);
          setRulesGot(true);
        } else {
          console.log("No rules available");
        }
      } catch (error) {
        console.error("Error fetching rules :", error.message);
      }
    };

    fetchParticipationDetails();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 15000); // Set timeout for 15 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [success]);

  useEffect(() => {
    if (failure) {
      const timer = setTimeout(() => {
        setFailure(false);
      }, 5000); // Set timeout for 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [failure]);

  const MAX_FILE_SIZE_MB = 30;

  const handleSubmit = async (e, formNumber, interval, interval2) => {
    e.preventDefault();
    

    switch (formNumber) {
      case 1:
        if (!file1) {
          setFailureMessage("No file selected.");
          setFailure(true);
          return;
        } else if (file1.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          setFailureMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
          setFailure(true);
          return;
        }
        break;
      case 2:
        if (!file2) {
          setFailureMessage("No file selected.");
          setFailure(true);
          return;
        } else if (file2.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          setFailureMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
          setFailure(true);
          return;
        }
        break;
      case 3:
        if (!file3) {
          setFailureMessage("No file selected.");
          setFailure(true);
          return;
        } else if (file3.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          setFailureMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
          setFailure(true);
          return;
        }
        break;
      case 4:
        if (!file4) {
          setFailureMessage("No file selected.");
          setFailure(true);
          return;
        } else if (file4.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          setFailureMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
          setFailure(true);
          return;
        }
        break;
      default:
        setFailureMessage("No file selected.");
        setFailure(true);
        return;
    }

    try {
      // Check if current date and time fall within the specified interval
      const {
        year: year1,
        month: month1,
        day: day1,
        hour: hour1,
        minute: minute1,
      } = interval;
      const {
        year: year2,
        month: month2,
        day: day2,
        hour: hour2,
        minute: minute2,
      } = interval2;

      const currentDate = new Date();

      // Convert dates to milliseconds for easy comparison
      const currentDateTime = currentDate.getTime();
      const interval1DateTime = new Date(
        year1,
        month1 - 1,
        day1,
        hour1,
        minute1,
      ).getTime();
      const interval2DateTime = new Date(
        year2,
        month2 - 1,
        day2,
        hour2,
        minute2,
      ).getTime();

      // Check if current date and time fall within the specified intervals
      if (
        !(
          currentDateTime >= interval1DateTime &&
          currentDateTime <= interval2DateTime
        )
      ) {
        setFailureMessage(
          `Upload of file ${formNumber} is only allowed between ${day1}/${month1}/${year1} at ${hour1}:${minute1} and ${day2}/${month2}/${year2} at ${hour2}:${minute2}.`,
        );
        setFailure(true);
        return;
      }

      const userDataString = localStorage.getItem("userData");
      if (!userDataString) return;

      const userData = JSON.parse(userDataString);
      if (!userData) return;

      setUploading(true);

      const uploadRef = ref(
        database,
        `fintech/2024/teams/${userData.id}/uploads`,
      );

      // Upload file to Firebase Storage
      const fileRef = storageRef(
        storage,
        `files/${userData.id}/upload_0${formNumber}`,
      );
      switch (formNumber) {
        case 1:
          await uploadBytes(fileRef, file1);
          const fileUrl = await getDownloadURL(fileRef); // Corrected function call
          await update(uploadRef, { upload_01: fileUrl });
          break;
        case 2:
          await uploadBytes(fileRef, file2);
          const fileUrl2 = await getDownloadURL(fileRef); // Corrected function call
          await update(uploadRef, { upload_02: fileUrl2 });
          break;
        case 3:
          await uploadBytes(fileRef, file3);
          const fileUrl3 = await getDownloadURL(fileRef); // Corrected function call
          await update(uploadRef, { upload_03: fileUrl3 });
          break;
        case 4:
          await uploadBytes(fileRef, file4);
          const fileUrl4 = await getDownloadURL(fileRef); // Corrected function call
          await update(uploadRef, { upload_04: fileUrl4 });
          break;
        default:
          break;
      }

      setSuccesMessages("Data saved successfully.");
      setSuccess(true);
      setUploading(false);
      console.log("saved successfully.");

      setFile1(null); // Reset file state
      setFile2(null); // Reset file state
      setFile3(null); // Reset file state
      setFile4(null); // Reset file state
    } catch (error) {
      setError(error.message);
      setUploading(false);
      setFailureMessage(error.message);
      setFailure(true);
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      {success && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
          id="toast-success"
          className="mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            {successMessage || "Data saved successfully."}
          </div>
        </div>
      )}

      {failure && (
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
            {failureMessage || "An error occurred."}
          </div>
        </div>
      )}

      <div className="container ">
        <div className="w-full" style={{ marginBottom: "30px" }}>
          <ol className="mx-auto mb-8 w-max space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
            <li
              className={`flex items-center space-x-2.5  rtl:space-x-reverse ${!isGettingStatus && filesData.upload_01 ? "text-blue-600 dark:text-blue-500" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${!isGettingStatus && filesData.upload_01 ? "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400" : "border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400"}`}
              >
                1
              </span>
              <span>
                <h3 className="font-medium leading-tight">Step</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>

            <li
              className={`flex items-center space-x-2.5  rtl:space-x-reverse ${!isGettingStatus && filesData.upload_02 ? "text-blue-600 dark:text-blue-500" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${!isGettingStatus && filesData.upload_02 ? "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400" : "border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400"}`}
              >
                2
              </span>
              <span>
                <h3 className="font-medium leading-tight">Step</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>

            <li
              className={`flex items-center space-x-2.5  rtl:space-x-reverse ${!isGettingStatus && filesData.upload_03 ? "text-blue-600 dark:text-blue-500" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${!isGettingStatus && filesData.upload_03 ? "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400" : "border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400"}`}
              >
                3
              </span>
              <span>
                <h3 className="font-medium leading-tight">Step</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>

            <li
              className={`flex items-center space-x-2.5  rtl:space-x-reverse ${!isGettingStatus && filesData.upload_04 ? "text-blue-600 dark:text-blue-500" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${!isGettingStatus && filesData.upload_04 ? "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400" : "border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400"}`}
              >
                4
              </span>
              <span>
                <h3 className="font-medium leading-tight">Step</h3>
                <p className="text-sm">Step details here</p>
              </span>
            </li>
          </ol>
        </div>

        <div
          className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <svg
            className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">
              Please try to click to upload a file and make sure it is uploaded
              correctly
            </span>
            <ul className="mt-1.5 list-inside list-disc">
              <li>
                Don&apos;t drag and drop files, click to upload -_- Good Luck
              </li>
              <li>
              Remember that you have the option to overwrite previous uploads, which implies that you can upload files until the deadline expires. The system considers the latest upload as the final submission.
              </li>
              <br />
            </ul>
          </div>
        </div>

        <div className="w-full px-4">
          <div
            className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
          >
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              1st File To Upload
            </h2>
            <p className="mb-12 text-base font-medium text-body-color">
              Status{" "}
              {!isGettingStatus && filesData.upload_01 && (
                <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Uploaded.
                </span>
              )}
              {!isGettingStatus && !filesData.upload_01 && (
                <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                  No file is uploaded yet.
                </span>
              )}
            </p>

            <form
              onSubmit={(e) =>
                handleSubmit(e, 1, rules.upload_01.start, rules.upload_01.end)
              }
            >
              <div className="-mx-4 flex flex-wrap">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file-1"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, MP4, PDF, TXT, CSV, JPG or Any Other Format [Max {MAX_FILE_SIZE_MB} MB]
                      </p>
                      <br />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file1 && (
                          <div
                            className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                            role="alert"
                          >
                            <svg
                              className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                              <span className="font-medium">
                                {file1.name || "No file selected."}
                              </span>
                            </div>
                          </div>
                        )}
                      </p>
                    </div>
                    <input
                      id="dropzone-file-1"
                      type="file"
                      onChange={(e) => setFile1(e.target.files[0])}
                      accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button
                    disabled={uploading || !isRules}
                    type="submit"
                    className="font-large mb-2 me-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
                    style={{
                      marginTop: "20px",
                      fontSize: "16px",
                      padding: "15px 25px",
                    }}
                  >
                    {uploading && (
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
                    Upload 1st File
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full px-4">
          <div
            className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
          >
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              2nd File To Upload
            </h2>
            <p className="mb-12 text-base font-medium text-body-color">
              Status{" "}
              {!isGettingStatus && filesData.upload_02 && (
                <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Uploaded.
                </span>
              )}
              {!isGettingStatus && !filesData.upload_02 && (
                <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                  No file is uploaded yet.
                </span>
              )}
            </p>
            <form
              onSubmit={(e) =>
                handleSubmit(e, 2, rules.upload_02.start, rules.upload_02.end)
              }
            >
              <div className="-mx-4 flex flex-wrap">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file-2"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, MP4, PDF, TXT, CSV, JPG or Any Other Format [Max {MAX_FILE_SIZE_MB} MB]
                      </p>
                      <br />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file2 && (
                          <div
                            className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                            role="alert"
                          >
                            <svg
                              className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                              <span className="font-medium">
                                {file2.name || "No file selected."}
                              </span>
                            </div>
                          </div>
                        )}
                      </p>
                    </div>
                    <input
                      id="dropzone-file-2"
                      type="file"
                      onChange={(e) => setFile2(e.target.files[0])}
                      accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button
                    disabled={uploading || !isRules}
                    type="submit"
                    className="font-large mb-2 me-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
                    style={{
                      marginTop: "20px",
                      fontSize: "16px",
                      padding: "15px 25px",
                    }}
                  >
                    {uploading && (
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
                    Upload 2nd File
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full px-4">
          <div
            className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
          >
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              3rd File To Upload
            </h2>
            <p className="mb-12 text-base font-medium text-body-color">
              Status{" "}
              {!isGettingStatus && filesData.upload_03 && (
                <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Uploaded.
                </span>
              )}
              {!isGettingStatus && !filesData.upload_03 && (
                <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                  No file is uploaded yet.
                </span>
              )}
            </p>
            <form
              onSubmit={(e) =>
                handleSubmit(e, 3, rules.upload_03.start, rules.upload_03.end)
              }
            >
              <div className="-mx-4 flex flex-wrap">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file-3"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, MP4, PDF, TXT, CSV, JPG or Any Other Format [Max {MAX_FILE_SIZE_MB} MB]
                      </p>
                      <br />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file3 && (
                          <div
                            className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                            role="alert"
                          >
                            <svg
                              className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                              <span className="font-medium">
                                {file3.name || "No file selected."}
                              </span>
                            </div>
                          </div>
                        )}
                      </p>
                    </div>
                    <input
                      id="dropzone-file-3"
                      type="file"
                      onChange={(e) => setFile3(e.target.files[0])}
                      accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button
                    disabled={uploading || !isRules}
                    type="submit"
                    className="font-large mb-2 me-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
                    style={{
                      marginTop: "20px",
                      fontSize: "16px",
                      padding: "15px 25px",
                    }}
                  >
                    {uploading && (
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
                    Upload 3rd File
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full px-4">
          <div
            className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
          >
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              4th File To Upload
            </h2>
            <p className="mb-12 text-base font-medium text-body-color">
              Status{" "}
              {!isGettingStatus && filesData.upload_04 && (
                <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Uploaded.
                </span>
              )}
              {!isGettingStatus && !filesData.upload_04 && (
                <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                  No file is uploaded yet.
                </span>
              )}
            </p>
            <form
              onSubmit={(e) =>
                handleSubmit(e, 4, rules.upload_04.start, rules.upload_04.end)
              }
            >
              <div className="-mx-4 flex flex-wrap">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file-4"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, MP4, PDF, TXT, CSV, JPG or Any Other Format [Max {MAX_FILE_SIZE_MB} MB]
                      </p>
                      <br />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {file4 && (
                          <div
                            className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                            role="alert"
                          >
                            <svg
                              className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                              <span className="font-medium">
                                {file4.name || "No file selected."}
                              </span>
                            </div>
                          </div>
                        )}
                      </p>
                    </div>
                    <input
                      id="dropzone-file-4"
                      type="file"
                      onChange={(e) => setFile4(e.target.files[0])}
                      accept=".pdf,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button
                    disabled={uploading || !isRules}
                    type="submit"
                    className="font-large mb-2 me-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
                    style={{
                      marginTop: "20px",
                      fontSize: "16px",
                      padding: "15px 25px",
                    }}
                  >
                    {uploading && (
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
                    Upload 4th File
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamProfile;
