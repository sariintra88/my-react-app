import React from 'react';
import { usePosts } from '../hooks/usePosts';

function Posts() {
  const { posts, loading, error, refetch } = usePosts();

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div className="posts-container">
      <h2 className="text-2xl font-bold">บทความทั้งหมด</h2>
      <button onClick={refetch} className="mt-4 p-2 bg-blue-600 text-white rounded">รีเฟรช</button>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;