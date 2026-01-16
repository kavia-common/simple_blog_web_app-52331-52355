import "./postItem.css";

/**
 * PUBLIC_INTERFACE
 */
export default function PostItem({ post, onDelete }) {
  /** Shows a single post with a delete action. */

  return (
    <article className="postCard">
      <header className="postHeader">
        <h3 className="postTitle">{post.title}</h3>
        <button
          type="button"
          className="dangerButton"
          onClick={() => onDelete(post.id)}
          aria-label={`Delete post: ${post.title}`}
        >
          Delete
        </button>
      </header>

      <p className="postContent">{post.content}</p>

      <footer className="postMeta">
        <span className="postDate">
          {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
        </span>
      </footer>
    </article>
  );
}
