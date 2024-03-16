"use client";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";

import { useSearchParams } from "next/navigation";

const BlogDetailsPage = () => {
  return (
    <>
      <section className="pb-[120px] pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Who is Abdelhakim Khaouiti? - A Short Story
                </h2>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 mr-10 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image src="/images/favicon.png" alt="author" fill />
                        </div>
                      </div>
                      <div className="w-full">
                        <span className="mb-1 text-base font-medium text-body-color">
                        سورة المعارج مكية | رقم السورة: 70 - عدد آياتها برواية حفص : 44 عدد كلماتها : 
                        </span>
                      </div>
                    </div>
                    
                  </div>
                  <div className="mb-5">
                    <a
                      href="#0"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      The Ascending
                    </a>
                  </div>
                </div>
                <div>
                  <p className="othmani mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed xl:text-4xl justify-content items-center"
                  
                >
                    سَالَ سَآئِلُۢ بِعَذَابٖ وَاقِعٖ (1) لِّلْكٰ۪فِرِينَ لَيْسَ
                    لَهُۥ دَافِعٞ (2) مِّنَ اَ۬للَّهِ ذِے اِ۬لْمَعَارِجِۖ (3)
                    تَعْرُجُ اُ۬لْمَلَٰٓئِكَةُ وَالرُّوحُ إِلَيْهِ فِے يَوْمٖ
                    كَانَ مِقْدَارُهُۥ خَمْسِينَ أَلْفَ سَنَةٖۖ (4) فَاصْبِرْ
                    صَبْراٗ جَمِيلاًۖ (5) اِنَّهُمْ يَرَوْنَهُۥ بَعِيداٗ (6)
                    وَنَر۪يٰهُ قَرِيباٗۖ (7) يَوْمَ تَكُونُ اُ۬لسَّمَآءُ
                    كَالْمُهْلِ (8) وَتَكُونُ اُ۬لْجِبَالُ كَالْعِهْنِ (9) وَلَا
                    يَسْـَٔلُ حَمِيمٌ حَمِيماٗ (10) يُبَصَّرُونَهُمْۖ يَوَدُّ
                    اُ۬لْمُجْرِمُ لَوْ يَفْتَدِے مِنْ عَذَابِ يَوْمَئِذِۢ
                    بِبَنِيهِ (11) وَصَٰحِبَتِهِۦ وَأَخِيهِ (12) وَفَصِيلَتِهِ
                    اِ۬لتِے تُـْٔوِيهِ (13) وَمَن فِے اِ۬لَارْضِ جَمِيعاٗ ثُمَّ
                    يُنجِيهِ (14) كَلَّآۖ إِنَّهَا لَظ۪يٰ (15) نَزَّاعَةٞ
                    لِّلشَّو۪يٰ (16) تَدْعُواْ مَنَ اَدْبَرَ وَتَوَلّ۪يٰ (17)
                    وَجَمَعَ فَأَوْع۪يٰٓۖ (18) إِنَّ اَ۬لِانسَٰنَ خُلِقَ
                    هَلُوعاً (19) اِذَا مَسَّهُ اُ۬لشَّرُّ جَزُوعاٗ (20) وَإِذَا
                    مَسَّهُ اُ۬لْخَيْرُ مَنُوعاً (21) اِلَّا اَ۬لْمُصَلِّينَ
                    (22) اَ۬لذِينَ هُمْ عَلَيٰ صَلَاتِهِمْ دَآئِمُونَۖ (23)
                    وَالذِينَ فِےٓ أَمْوَٰلِهِمْ حَقّٞ مَّعْلُومٞ (24)
                    لِّلسَّآئِلِ وَالْمَحْرُومِۖ (25) وَالذِينَ يُصَدِّقُونَ
                    بِيَوْمِ اِ۬لدِّينِۖ (26) وَالذِينَ هُم مِّنْ عَذَابِ
                    رَبِّهِم مُّشْفِقُونَ (27) إِنَّ عَذَابَ رَبِّهِمْ غَيْرُ
                    مَامُونٖۖ (28) وَالذِينَ هُمْ لِفُرُوجِهِمْ حَٰفِظُونَ (29)
                    إِلَّا عَلَيٰٓ أَزْوَٰجِهِمُۥٓ أَوْ مَا مَلَكَتَ
                    اَيْمَٰنُهُمْ فَإِنَّهُمْ غَيْرُ مَلُومِينَۖ (30) فَمَنِ
                    اِ۪بْتَغ۪يٰ وَرَآءَ ذَٰلِكَ فَأُوْلَٰٓئِكَ هُمُ
                    اُ۬لْعَادُونَۖ (31) وَالذِينَ هُمْ لِأَمَٰنَٰتِهِمْ
                    وَعَهْدِهِمْ رَٰعُونَۖ (32) وَالذِينَ هُم بِشَهَٰدَتِهِمْ
                    قَآئِمُونَۖ (33) وَالذِينَ هُمْ عَلَيٰ صَلَاتِهِمْ
                    يُحَافِظُونَ (34) أُوْلَٰٓئِكَ فِے جَنَّٰتٖ مُّكْرَمُونَۖ
                    (35) فَمَالِ اِ۬لذِينَ كَفَرُواْ قِبَلَكَ مُهْطِعِينَ (36)
                    عَنِ اِ۬لْيَمِينِ وَعَنِ اِ۬لشِّمَالِ عِزِينَۖ (37)
                    أَيَطْمَعُ كُلُّ اُ۪مْرِےٕٖ مِّنْهُمُۥٓ أَنْ يُّدْخَلَ
                    جَنَّةَ نَعِيمٖ (38) كَلَّآۖ إِنَّا خَلَقْنَٰهُم مِّمَّا
                    يَعْلَمُونَۖ (39) ۞فَلَآ أُقْسِمُ بِرَبِّ اِ۬لْمَشَٰرِقِ
                    وَالْمَغَٰرِبِ إِنَّا لَقَٰدِرُونَ (40) عَلَيٰٓ أَن
                    نُّبَدِّلَ خَيْراٗ مِّنْهُمْ وَمَا نَحْنُ بِمَسْبُوقِينَۖ
                    (41) فَذَرْهُمْ يَخُوضُواْ وَيَلْعَبُواْ حَتَّيٰ يُلَٰقُواْ
                    يَوْمَهُمُ اُ۬لذِے يُوعَدُونَ (42) يَوْمَ يَخْرُجُونَ مِنَ
                    اَ۬لَاجْدَاثِ سِرَاعاٗ كَأَنَّهُمُۥٓ إِلَيٰ نَصْبٖ
                    يُوفِضُونَ (43) خَٰشِعَةً اَبْصَٰرُهُمْ تَرْهَقُهُمْ
                    ذِلَّةٞۖ ذَٰلِكَ اَ۬لْيَوْمُ اُ۬لذِے كَانُواْ يُوعَدُونَۖ
                    (44)
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src="/blogs/about-me/blog-001/1.jpg"
                        alt="image"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Chapter 1: The Beginning
                  </h3>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    I remember it was about 2 or 3 years ago when I first came
                    across Python. I was curious about what Python was and what
                    programming meant. I wanted to understand how to make a
                    computer do things with code. That&apos;s how it all began.
                    I discovered that with just a few lines of code, I could do
                    amazing things. It might sound funny, but it&apos;s true. I
                    still remember the first time I pressed &quot;Enter&quot;
                    while using Python&apos;s library. I made my first desktop
                    app, which was just a simple window. It might have been
                    basic, but I was really proud of it. It felt like creating
                    something big, like those apps from famous companies.{" "}
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    From that moment on, I started learning more and more about
                    programming. By the end of the year, I had earned three
                    certificates in Python. Now, I have five certificates just
                    in Python alone. That year was just the beginning. I
                    continued learning new programming languages and exploring
                    this incredible world of coding.
                  </p>

                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Chapter 2: My Programming Journey
                  </h3>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    As I mentioned earlier, I began my programming journey with
                    Python. Then, I shifted my focus to HTML, CSS, and
                    JavaScript as I tried to understand how the web works and
                    continues to evolve. This marked a new phase in my journey.
                    I started creating basic web pages, experimenting with
                    decorations, styling buttons, and observing how JavaScript
                    interacted with HTML. I also dabbled in building simple
                    apps, incorporating videos and images into my web pages.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Soon, I became curious about mobile app development,
                    particularly Android apps. I watched tutorials by Indian and
                    English speakers to learn the basics of creating Android
                    apps. The initial stages were tough, but I still vividly
                    remember the excitement of creating my first Android app—a
                    simple one-button app that played a sound when clicked. It
                    felt like a dream come true.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Just like I did with Python, I delved into Java for Android
                    app development before eventually transitioning to Kotlin. I
                    enrolled in the National High School of Computer Science and
                    System Analysis in Rabat City, Morocco, where my coding
                    skills truly flourished. In just one year, I managed to
                    develop six Android apps, five Chrome extensions, and
                    several websites, including district apps and personal
                    projects. I also deployed over a dozen websites.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Despite my achievements, my learning journey continues.
                    I&apos;m constantly exploring new technologies and solutions
                    to real-world problems. Particularly, I find myself drawn to
                    the realm of artificial intelligence, where advancements are
                    shaping the future of technology.
                  </p>

                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Chapter 3: Early Beginnings
                  </h3>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Before diving into coding, programming, and IT, let&apos;s
                    take a step back and talk about my early beginnings. About 5
                    years ago, during my first year in college, I spent most of
                    my time immersed in video and photo editing. I dedicated a
                    whole year, from age 18, to learning Adobe programs such as
                    Photoshop, Illustrator, Premiere, After Effects, and more.
                    This gave me a solid foundation in video and photo editing.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    In my second year, I ventured into sound engineering because
                    of my passion for singing and reciting the Holy Quran. I
                    began learning sound engineering using software like
                    Mixcraft and Adobe Audition. It was a rewarding experience.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    By the third year, I shifted gears entirely and delved into
                    learning languages—not programming languages, but human
                    languages. I started learning German, Turkish, Spanish, a
                    bit of English, and French using apps like Duolingo and
                    various other resources.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Then, in my fourth year, my journey with programming began.
                    It&apos;s like adding different flavors to the mix—a
                    combination of programming, sound editing, and languages.
                    You might think it&apos;s an odd mix, but believe me, all
                    these skills have been incredibly useful. Now, I can design
                    logos, write captions, and host websites for the apps I
                    build. While some people excel in specific tasks, all the
                    diverse skills I&apos;ve learned have not gone to waste.
                    They&apos;ve proven to be invaluable assets on my
                    journey—from photo editing to sound engineering, and
                    finally, to programming and creating innovative apps.
                  </p>

                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                    Chapter 4: What&apos;s Next?
                  </h3>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    So, perhaps you&apos;re curious about my future plans. Let
                    me share some of my secrets, my plans. Nowadays, my goal is
                    to share my modest knowledge with you, my friends and fellow
                    enthusiasts. That&apos;s why I&apos;ve created KHAOUITI
                    Blogs website, my very own blog platform. It&apos;s where I
                    intend to share my knowledge with you all.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Another dream of mine is to expand my brand, KHAOUITI Apps,
                    and make it a go-to solution for anyone seeking answers in
                    the world of technology. Whether it&apos;s building Android
                    or iOS apps, desktop software, websites, extensions, or
                    plugins, I want KHAOUITI Apps to be there as a reliable
                    alternative.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Lastly, I want you to know that this platform is for you,
                    made with love. I&apos;ve poured my heart into it to share
                    knowledge, tricks, best practices, and anything else that
                    can make your learning journey smoother. I hope you find it
                    useful and enjoyable.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Thank you so much for reading this tutorial. If you&apos;ve
                    read it all the way to the end, Bravo! Bravo! Bravo! Your
                    love and commitment mean a lot to me. Thank you.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    #aboutme #khaouiti #abdelhakim #khaouitiblogs #khaouitiapps
                  </p>
                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      <h4 className="mb-3 text-sm font-medium text-body-color">
                        Popular Tags :
                      </h4>
                      <div className="flex items-center">
                        <TagButton text="About Me" />
                        <TagButton text="KHAOUITI Blogs" />
                        <TagButton text="KHAOUITI" />
                      </div>
                    </div>
                    {/**
                     * <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                        Share this post :
                      </h5>
                      <div className="flex items-center sm:justify-end">
                        <SharePost />
                      </div>
                    </div>
                     */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
