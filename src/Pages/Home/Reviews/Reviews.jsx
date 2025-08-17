import React from "react";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa"; // ⭐ from react-icons

const reviews = [
  {
    id: 1,
    name: "Sophia Williams",
    role: "Software Engineer",
    review:
      "This platform has been a game-changer for me. The clean design, smooth experience, and well-structured features really stand out.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "James Miller",
    role: "Product Designer",
    review:
      "I love how intuitive and easy to use this is. It saves me time and keeps everything well-organized.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma Johnson",
    role: "Marketing Specialist",
    review:
      "Fantastic experience! The attention to detail and smooth animations make it feel premium.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-primary mb-12">
          What People Say
        </motion.h2>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition p-6">
              {/* Header: Avatar + Info */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {review.role}
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                “{review.review}”
              </p>

              {/* Rating */}
              <div className="flex">
                {[...Array(review.rating)].map((_, idx) => (
                  <FaStar key={idx} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
