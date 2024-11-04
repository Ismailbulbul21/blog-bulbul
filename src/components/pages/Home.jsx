import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogList from '../blog/BlogList';
import CategoryFilter from '../blog/CategoryFilter';
import { useFirestore } from '../../hooks/useFirestore';
import { Link } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getAll } = useFirestore('posts');

  useEffect(() => {
    const fetchCategories = async () => {
      const posts = await getAll();
      const uniqueCategories = [...new Set(posts.map(post => post.category).filter(Boolean))];
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, [getAll]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 mix-blend-multiply" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0] 
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-500 opacity-20" 
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Discover <span className="text-blue-400">Stories</span> That Matter
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-gray-300 max-w-3xl"
          >
            Explore thought-provoking articles, insights, and stories from our community of writers.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Blog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Our Blog Posts</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Blog List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BlogList selectedCategory={selectedCategory} />
        </motion.div>
      </div>

      {/* Newsletter Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:py-16">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-extrabold text-white mb-8"
                >
                  Stay Updated
                </motion.h2>
                <motion.form 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-8 sm:flex justify-center"
                >
                  <input
                    type="email"
                    className="w-full sm:max-w-xs px-5 py-3 border border-transparent rounded-full text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </motion.form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;