import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PAGE_SIZE = 5;

export default function Preview() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8087/article?limit=100&offset=0`);
      setPosts(res.data.filter(p => p.status === 'publish'));
    } catch {
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const paged = posts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <div className="preview-container">
      <h2>Published Articles</h2>
      {loading ? <div>Loading...</div> : (
        <div>
          {paged.map(post => (
            <div key={post.id} className="preview-card">
              <h3>{post.title}</h3>
              <div className="preview-category">{post.category}</div>
              <div>{post.content}</div>
            </div>
          ))}
          <div className="preview-pagination">
            <button className="secondary-btn" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Prev</button>
            <span className="preview-page-info">Page {page + 1} of {totalPages}</span>
            <button className="secondary-btn" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page + 1 >= totalPages}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
} 