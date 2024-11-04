import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';
import { truncateText } from '../../utils/textFormatter';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.imageUrl && (
        <img
          className="w-full h-48 object-cover"
          src={post.imageUrl}
          alt={post.title}
        />
      )}
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
          {post.category && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {post.category}
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">
          {truncateText(post.content, 150)}
        </p>
        <Link
          to={`/blog/${post.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 