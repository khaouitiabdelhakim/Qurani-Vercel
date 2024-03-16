"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const color = "#620075";

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update current year when component mounts
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  return (
    <>
      <footer
        className="wow fadeInUp relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 inline-block">
                  <Image
                    src="/images/logo/logo-black.png"
                    alt="logo"
                    className=" dark:hidden"
                    width={200}
                    height={60}
                  />
                  <Image
                    src="/images/logo/logo-white.png"
                    alt="logo"
                    className="hidden  dark:block"
                    width={200}
                    height={60}
                  />
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Revolutionize Your Lifestyle with Mind-Blowing Apps
                </p>
                <div className="flex items-center">
                  <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                    <div className="mr-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src="/images/profile.jpg"
                          alt="author"
                          width={130}
                          height={130}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                        By KHAOUITI ABDELHAKIM
                      </h4>
                      <p className="text-xs text-body-color">KHAOUITI Blogs</p>
                    </div>
                  </div>
                  <div className="inline-block">
                    <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                      Released on
                    </h4>
                    <p className="text-xs text-body-color">2024</p>
                  </div>
                </div>
                <br />
                <br />
                <div className="flex items-center">
                  <a
                    href="https://www.linkedin.com/company/khaouitiapps"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/LinkedIN_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/LinkedIN_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>

                  <a
                    href="https://github.com/khaouitiabdelhakim"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/Github_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/Github_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>

                  <a
                    href="https://play.google.com/store/apps/dev?id=6790777955192662209"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/GooglePlay_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/GooglePlay_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>

                  <a
                    href="https://www.youtube.com/@khaouitiabdelhakim"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/Youtube_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/Youtube_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>

                  <a
                    href="https://khaouitiapps.web.app"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/Google_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/Google_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Useful Links
                </h2>
                <ul>
                  <li>
                    <a
                      href="/main/about"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/main"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/main/apps"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Apps
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Terms
                </h2>
                <ul>
                  <li>
                    <a
                      href="/main"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      TOS
                    </a>
                  </li>
                  <li>
                    <a
                      href="/main/privacy-policy"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/main"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Terms of use
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  KHAOUITI Solutions
                </h2>
                <ul>
                  <li>
                    <a
                      href="/main"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/main/"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      I Want An App
                    </a>
                  </li>
                  <li>
                    <a
                      href="/main/about"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="flex items-center justify-center py-8">
            <p
              className="text-center text-base text-body-color dark:text-white"
              style={{
                fontSize: "14px",
              }}
            >
              <a
                href="#"
                className="  duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                قرآني
              </a>{" "}
              - جميع الحقوق محفوظة{"   "}
              
              © 2024 - {currentYear} {"   "}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
