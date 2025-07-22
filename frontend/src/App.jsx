import { Routes, Route, Link } from 'react-router-dom';
import AllPosts from './pages/AllPosts';
import AddNew from './pages/AddNew';
import EditPost from './pages/EditPost';
import Preview from './pages/Preview';

export default function App() {
  return (
    <div>
      <nav style={{ padding: 16, borderBottom: '1px solid #eee', marginBottom: 24 }}>
        <Link to="/" style={{ marginRight: 16 }}>All Posts</Link>
        <Link to="/add" style={{ marginRight: 16 }}>Add New</Link>
        <Link to="/preview" style={{ marginLeft: 16 }}>Preview</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
} 