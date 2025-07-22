import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8087/article/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category);
        setStatus(res.data.status);
      })
      .catch(() => setError('Not found'));
  }, [id]);

  const handleSubmit = async (newStatus) => {
    setError('');
    try {
      await axios.put(`http://localhost:8087/article/${id}`, {
        title,
        content,
        category,
        status: newStatus,
      });
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Article</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="input-field"
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button className="primary-btn" onClick={() => handleSubmit('publish')}>Publish</button>
      <button className="secondary-btn" onClick={() => handleSubmit('draft')}>Draft</button>
    </div>
  );
} 