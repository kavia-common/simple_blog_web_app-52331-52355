const DEFAULT_SEEDED_POSTS = [
  {
    id: "seed-1",
    title: "Welcome to Simple Blog",
    content:
      "This is a tiny blog app that stores posts in your browser using localStorage. Try adding a post!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    title: "Tips",
    content:
      "• Add posts with the form\n• Delete posts with the Delete button\n• Refresh the page — your posts stay",
    createdAt: new Date().toISOString(),
  },
];

/**
 * PUBLIC_INTERFACE
 */
export function loadPosts(storageKey) {
  /** Load posts array from localStorage. Returns [] if missing/invalid. */
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 */
export function savePosts(storageKey, posts) {
  /** Save posts array to localStorage. */
  try {
    localStorage.setItem(storageKey, JSON.stringify(posts));
  } catch {
    // localStorage can fail (private mode / full storage). We silently ignore here for simplicity.
  }
}

/**
 * PUBLIC_INTERFACE
 */
export function ensureSeededPosts(posts) {
  /** If no posts exist, return a small default seeded set. */
  if (Array.isArray(posts) && posts.length > 0) return posts;
  return DEFAULT_SEEDED_POSTS;
}

/**
 * PUBLIC_INTERFACE
 */
export function addPost(existingPosts, { title, content }) {
  /** Create a new post and return the new array (newest first). */
  const now = new Date().toISOString();
  const newPost = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`,
    title,
    content,
    createdAt: now,
  };

  const safeExisting = Array.isArray(existingPosts) ? existingPosts : [];
  return [newPost, ...safeExisting];
}

/**
 * PUBLIC_INTERFACE
 */
export function deletePostById(existingPosts, id) {
  /** Remove a post by id and return the new array. */
  const safeExisting = Array.isArray(existingPosts) ? existingPosts : [];
  return safeExisting.filter((p) => p.id !== id);
}
