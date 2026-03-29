import axios from "axios";

// Standard Public API instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/cms`,
});

export const fetchPublicBlogPosts = async () => {
  const res = await api.get("/blog");
  return res.data;
};

export const fetchPublicBlogPostBySlug = async (slug) => {
  const res = await api.get(`/blog/${slug}`);
  return res.data;
};

export const fetchPublicWebPageBySlug = async (slug) => {
  const res = await api.get(`/page/${slug}`);
  return res.data;
};
