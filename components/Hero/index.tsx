import Link from "next/link";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const Hero = () => {
  const color = "#620075";

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
        style={{paddingBottom: "0px", marginBottom: "0px"}}
      >
        <div className="container" style={{paddingBottom: "0px", marginBottom: "0px"}}>
          <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
            <div className="-mx-4 flex flex-wrap ">
              <div className="w-full px-4 lg:w-1/2">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div
                      className="wow fadeInUp mx-auto max-w-[800px] "
                      data-wow-delay=".2s"
                    >
                      <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-8xl">
                        Qurani{" "}
                        <br />
                        <span className="bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent">
                          قرآني
                        </span>
                      </h3>

                      <br />
                      <div className="flex justify-start">
                        <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                          <span className="text-5xl font-extrabold dark:text-white">
                          ورتّل القرآن  {" "}
                            <span className="bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent">
                            ترتيلاً
                            </span>{" "}
                          </span>
                        </h1>
                      </div>

                      <p
                        className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl"
                        style={{ fontSize: "19px" }}
                      >
                        عن النبي صلى الله عليه وسلم قال : (خيركم من تعلم القرآن وعلمه ) رواه أبو داود والترمذي.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div
                  className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                  data-wow-delay=".2s"
                >
                  <Image
                    src="/images/blogs1.png"
                    alt="about-image"
                    fill
                    className="mx-auto  drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                    style={{ borderRadius: "10px", objectFit: "contain" }}
                  />
                  <Image
                    src="/images/blogs1.png"
                    alt="about-image"
                    fill
                    className="mx-auto hidden  drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                    style={{ borderRadius: "10px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
