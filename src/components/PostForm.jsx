import { useId, useState } from "react";
import "./postForm.css";

/**
 * PUBLIC_INTERFACE
 */
export default function PostForm({ onCreate }) {
  /** Controlled form to create a new post (title + content). */

  const titleId = useId();
  const contentId = useId();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [touched, setTouched] = useState(false);

  const titleTrimmed = title.trim();
  const contentTrimmed = content.trim();
  const canSubmit = titleTrimmed.length > 0 && contentTrimmed.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);

    if (!canSubmit) return;

    onCreate({ title: titleTrimmed, content: contentTrimmed });

    // Clear the form after successful creation.
    setTitle("");
    setContent("");
    setTouched(false);
  }

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={titleId} className="label">
          Title
        </label>
        <input
          id={titleId}
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="e.g., My first post"
          maxLength={120}
          autoComplete="off"
        />
        {touched && titleTrimmed.length === 0 ? (
          <p className="error">Please enter a title.</p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor={contentId} className="label">
          Content
        </label>
        <textarea
          id={contentId}
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Write something short and friendly..."
          rows={6}
          maxLength={2000}
        />
        {touched && contentTrimmed.length === 0 ? (
          <p className="error">Please enter some content.</p>
        ) : null}
      </div>

      <button type="submit" className="primaryButton" disabled={!canSubmit}>
        Add Post
      </button>
    </form>
  );
}
