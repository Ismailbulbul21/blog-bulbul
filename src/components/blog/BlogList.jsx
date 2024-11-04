import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { useFirestore } from '../../hooks/useFirestore';
import Loading from '../common/Loading';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';

const BlogList = ({ selectedCategory }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Filter by category if selected
        const filteredPosts = selectedCategory
          ? fetchedPosts.filter(post => post.category === selectedCategory)
          : fetchedPosts;

        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (posts.length === 0) return <div className="text-center py-8">No posts found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogList; 