import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Participations = () => {
  return (
    <section
      id="blogs"
      className="pt-16 md:pt-20 lg:pt-28"
     >
      <div className="container">
        <SectionTitle
          title="Discover KHAOUITI Blogs"
          paragraph="Embark on a journey of discovery with KHAOUITI Blogs: Where passion meets insight, and every word paints a vivid picture."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Participations;
