import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import { formatDate } from '../../utils/dateFormatter';
import { truncateText } from '../../utils/textFormatter';
import Loading from '../common/Loading';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAll, remove } = useFirestore('posts');

  useEffect(() => {
    fetchPosts();
  }, [getAll]);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAll();
      setPosts(fetchedPosts.sort((a, b) => b.createdAt - a.createdAt));
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
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="px-6 py-4">
                <div className="font-medium">{truncateText(post.title, 50)}</div>
              </td>
              <td className="px-6 py-4">
                {post.category || '-'}
              </td>
              <td className="px-6 py-4">
                {formatDate(post.createdAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/edit/${post.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-green-600 hover:text-green-800"
                    target="_blank"
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsList; 