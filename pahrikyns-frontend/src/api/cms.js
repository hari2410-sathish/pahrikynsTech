import API from "./axios";

export const fetchPublicBlogPosts = async () => {
  const res = await API.get("/api/cms/blog");
  return res.data;
};

export const fetchPublicBlogPostBySlug = async (slug) => {
  const res = await API.get(`/api/cms/blog/${slug}`);
  return res.data;
};

export const fetchPublicWebPageBySlug = async (slug) => {
  const res = await API.get(`/api/cms/page/${slug}`);
  return res.data;
};
