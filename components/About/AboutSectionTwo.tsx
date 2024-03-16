import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28" style={{paddingBottom: "0px", marginBottom: "0px"}}>
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
              
                src="/images/blogs2.png"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
                style={{ borderRadius: '10px' }}
              />
              <Image
                src="/images/blogs2.png"
                alt="about image"
                fill
                className="drop-shadow-three hidden dark:block dark:drop-shadow-none"
                style={{ borderRadius: '10px' }}
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Unlock the world of KHAOUITI Blogs
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg xl:text-2xl sm:leading-relaxed othmani">
                أَلَٓمِّٓۖ ذَٰلِكَ اَ۬لْكِتَٰبُ لَا رَيْبَۖ فِيهِ هُديٗ لِّلْمُتَّقِينَ (1) اَ۬لذِينَ يُومِنُونَ بِالْغَيْبِ وَيُقِيمُونَ اَ۬لصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَۖ (2) وَالذِينَ يُومِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِالَاخِرَةِ هُمْ يُوقِنُونَ (3)  </p></div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                But what&apos;s the story behind it all?
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                It&apos;s a tale of boundless passion and unfulfilled promises – of constantly telling myself, &apos;Tomorrow, I&apos;ll start that YouTube playlist. Yet, from that desire springs forth something even greater: a platform that transcends mere videos, offering a richer, more immersive experience for all.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
