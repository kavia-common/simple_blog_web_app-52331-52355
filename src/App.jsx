import { useEffect, useMemo, useState } from "react";
import PostForm from "./components/PostForm.jsx";
import PostList from "./components/PostList.jsx";
import {
  addPost,
  deletePostById,
  ensureSeededPosts,
  loadPosts,
  savePosts,
} from "./utils/storage.js";
import "./styles/app.css";

const STORAGE_KEY = "blog_posts";

// PUBLIC_INTERFACE
export default function App() {
  /** Root app component for the simple localStorage-backed blog. */

  // Load from localStorage once on first render, then seed if empty.
  const initialPosts = useMemo(() => {
    const loaded = loadPosts(STORAGE_KEY);
    return ensureSeededPosts(loaded);
  }, []);

  const [posts, setPosts] = useState(initialPosts);

  // Persist whenever posts changes.
  useEffect(() => {
    savePosts(STORAGE_KEY, posts);
  }, [posts]);

  function handleCreatePost({ title, content }) {
    setPosts((prev) => addPost(prev, { title, content }));
  }

  function handleDeletePost(id) {
    setPosts((prev) => deletePostById(prev, id));
  }

  return (
    <div className="appShell">
      <header className="header">
        <div className="container headerInner">
          <div>
            <h1 className="brand">Simple Blog</h1>
            <p className="subtitle">A tiny localStorage-powered blog (no backend)</p>
          </div>
        </div>
      </header>

      <main className="container main">
        <div className="grid">
          <section className="panel">
            <h2 className="panelTitle">Posts</h2>
            <PostList posts={posts} onDelete={handleDeletePost} />
          </section>

          <aside className="panel">
            <h2 className="panelTitle">Create a new post</h2>
            <PostForm onCreate={handleCreatePost} />
            <p className="hint">
              Posts are saved automatically to <code>localStorage</code> under{" "}
              <code>{STORAGE_KEY}</code>.
            </p>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <span>
            Built with React Hooks • Data stored locally in your browser
          </span>
        </div>
      </footer>
    </div>
  );
}
