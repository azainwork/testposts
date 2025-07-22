import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddNew() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (status) => {
    setError('');
    try {
      await axios.post('http://localhost:8087/article/', {
        title,
        content,
        category,
        status,
      });
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Article</h2>
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