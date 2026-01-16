import PostItem from "./PostItem.jsx";
import "./postList.css";

/**
 * PUBLIC_INTERFACE
 */
export default function PostList({ posts, onDelete }) {
  /** Renders a list of posts with per-post delete buttons. */

  if (!posts || posts.length === 0) {
    return (
      <div className="emptyState">
        <p className="emptyTitle">No posts yet</p>
        <p className="emptyText">Create your first post using the form on the right.</p>
      </div>
    );
  }

  return (
    <ul className="postList" aria-label="Blog posts">
      {posts.map((post) => (
        <li key={post.id} className="postListItem">
          <PostItem post={post} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
