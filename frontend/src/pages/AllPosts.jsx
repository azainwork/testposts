import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const STATUS = [
  { key: 'publish', label: 'Published' },
  { key: 'draft', label: 'Drafts' },
  { key: 'thrash', label: 'Trashed' },
];

export default function AllPosts() {
  const [tab, setTab] = useState('publish');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8087/article?limit=100&offset=0');
      setPosts(res.data);
    } catch (e) {
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleThrash = async (id) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    await axios.put(`http://localhost:8087/article/${id}`, {
      title: post.title,
      content: post.content,
      category: post.category,
      status: 'thrash',
    });
    fetchPosts();
  };

  const filtered = posts.filter(p => p.status === tab);

  return (
    <div className="table-container">
      <div className="tabs">
        {STATUS.map(s => (
          <button
            key={s.key}
            onClick={() => setTab(s.key)}
            className={tab === s.key ? 'active' : ''}
          >
            {s.label}
          </button>
        ))}
      </div>
      {loading ? <div>Loading...</div> : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>
                  <button className="action-btn" onClick={() => handleEdit(post.id)}>✏️</button>
                  {tab !== 'thrash' && (
                    <button className="action-btn" onClick={() => handleThrash(post.id)}>🗑️</button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={3}>No data</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
} 