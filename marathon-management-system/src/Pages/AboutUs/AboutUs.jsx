// src/pages/AboutUs.jsx
import { motion } from "framer-motion";
import { ArrowRight, HeartPulse, Users, Trophy } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      {/* ===== Hero Section ===== */}
      <section
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520975918313-6a29ccf7f0b9?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <motion.div
          className="relative z-10 text-white px-6 max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            About Marathon Management
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Empowering Runners, Connecting Communities, Inspiring Health.
          </p>
        </motion.div>
      </section>

      {/* ===== Mission & Vision Section ===== */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center grid md:grid-cols-2 gap-10">
        <motion.div
          className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-blue-600"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To empower athletes and event organizers through innovation —
            simplifying marathon planning, registration, and participation.
            We’re here to make every race a celebration of endurance, unity, and
            achievement.
          </p>
        </motion.div>

        <motion.div
          className="bg-pink-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-pink-600"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We envision a world where every runner, regardless of background,
            can participate in meaningful events that promote health, friendship,
            and community spirit — powered by seamless digital experiences.
          </p>
        </motion.div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <HeartPulse className="w-12 h-12 mx-auto text-pink-600 dark:text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Health First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We promote healthy lifestyles through organized running events
                that bring joy and wellness to every participant.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We connect runners and organizers across regions, fostering
                teamwork, encouragement, and shared goals.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-12 h-12 mx-auto text-yellow-500 dark:text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Achievement Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Whether it’s your first 5K or a full marathon, we celebrate your
                milestones and keep you motivated to achieve more.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Developer Section ===== */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Meet the Developer
        </motion.h2>
        {/* <motion.p
          className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          👩‍💻 <strong>Ayasha Akter</strong> — A passionate <strong>Junior Web Developer</strong> who loves crafting
          creative and impactful web applications using the <strong>MERN stack</strong>.  
          <br />
          This project, <em>Marathon Management System</em>, demonstrates her expertise in building dynamic,
          responsive, and user-centered digital platforms.
        </motion.p> */}

        <a
          href="/marathons"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all"
        >
          Explore Marathons <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
