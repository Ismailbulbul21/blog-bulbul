import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import { formatDate } from '../../utils/dateFormatter';
import { motion } from 'framer-motion';
import Loading from '../common/Loading';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAll, remove } = useFirestore('posts');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAll();
      setPosts(fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await remove(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
                  Category
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                  Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {posts.map((post) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      {post.imageUrl && (
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={post.imageUrl}
                            alt=""
                          />
                        </div>
                      )}
                      <div className="truncate max-w-xs">
                        <div className="font-medium text-gray-900">{post.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">
                    {post.category || '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        target="_blank"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/edit/${post.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found. Create your first post!</p>
          <Link
            to="/admin/create"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostsList; 