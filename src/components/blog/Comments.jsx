import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useFirestore } from '../../hooks/useFirestore';
import { timeAgo } from '../../utils/dateFormatter';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const { add, getAll } = useFirestore(`posts/${postId}/comments`);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getAll();
      setComments(fetchedComments.sort((a, b) => b.createdAt - a.createdAt));
    };

    fetchComments();
  }, [getAll]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await add({
        content: newComment,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date().toISOString()
      });
      setNewComment('');
      // Refresh comments
      const updatedComments = await getAll();
      setComments(updatedComments.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
            placeholder="Add a comment..."
            rows="3"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mb-6 text-gray-600">Please login to comment.</p>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{comment.userEmail}</span>
              <span className="text-sm text-gray-500">
                {timeAgo(comment.createdAt)}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments; 