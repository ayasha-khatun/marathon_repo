import { useState } from "react";
import { FiSearch, FiCalendar, FiUser } from "react-icons/fi";

const blogsData = [
  {
    id: 1,
    title: "Top 5 Tips to Prepare for a Marathon",
    author: "John Runner",
    date: "Oct 10, 2025",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    content:
      "Running a marathon requires months of preparation, discipline, and mental focus. Start with small goals, maintain a balanced diet, stay hydrated, and never skip rest days. Consistency is key to success!",
  },
  {
    id: 2,
    title: "The Importance of Proper Running Shoes",
    author: "Sarah Athlete",
    date: "Oct 5, 2025",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=800&q=80",
    content:
      "Choosing the right running shoes can prevent injuries and improve performance. Always look for proper cushioning, fit, and flexibility. Replace shoes after every 400–500 miles of use.",
  },
  {
    id: 3,
    title: "Nutrition Guide for Marathon Runners",
    author: "David Fitness",
    date: "Sep 28, 2025",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    content:
      "Marathon training burns a lot of energy. Fuel your body with carbohydrates, proteins, and healthy fats. Avoid processed foods and make sure to refuel within 30 minutes after each run.",
  },
  {
    id: 4,
    title: "Mental Strategies for Long Distance Running",
    author: "Emily Coach",
    date: "Sep 18, 2025",
    image:
      "https://i.ibb.co.com/9kST34MD/sideways-shot-handsome-active-man-runs-against-mountain-beautiful-scenery-photographed-motion-enjoys.jpg",
    content:
      "Running long distances is as much about mental endurance as physical strength. Visualization, positive affirmations, and breathing techniques can help you stay calm and focused.",
  },
  {
    id: 5,
    title: "Recovery After a Marathon: What to Do Next",
    author: "Michael Health",
    date: "Sep 12, 2025",
    image:
      "https://i.ibb.co.com/nMcTMWYs/full-shot-man-stretching.jpg",
    content:
      "Post-race recovery is crucial. Focus on stretching, hydration, and sleep. Light walking or yoga can help reduce muscle soreness. Avoid intense workouts for at least a week after your marathon.",
  },
  {
    id: 6,
    title: "Best Marathon Events Around the World",
    author: "Anna Traveler",
    date: "Aug 29, 2025",
    image:
      "https://i.ibb.co.com/svY9YZTR/athletic-man-running-urban-street-against-grey-background.jpg",
    content:
      "From the Boston Marathon to the Tokyo Marathon, each event offers a unique experience. Traveling for marathons allows runners to explore new cultures, meet people, and test their limits across the globe.",
  },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const filteredBlogs = blogsData.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
          MarathonX Blog
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Insights, tips, and inspiration for every runner 🚀
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blog titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-600 outline-none dark:bg-gray-800 dark:text-white"
          />
          <FiSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {blog.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                  <span className="flex items-center gap-1">
                    <FiUser /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar /> {blog.date}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {blog.content}
                </p>

                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="text-yellow-600 font-medium hover:underline"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
            No blog found matching your search.
          </p>
        )}
      </div>

      {/* Modal for full blog */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">
              {selectedBlog.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mb-4">
              <span className="flex items-center gap-1">
                <FiUser /> {selectedBlog.author}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar /> {selectedBlog.date}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-200">
              {selectedBlog.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
