import api from "../../../api/axios";


/* ================================
   ADMIN DASHBOARD – SUMMARY
================================ */
export const getAdminSummary = async () => {
  const res = await api.get("/admin/dashboard/summary");
  return res.data;
};

/* ================================
   MONTHLY ENROLLMENTS (LINE CHART)
================================ */
export const getAdminEnrollments = async () => {
  const res = await api.get("/admin/dashboard/enrollments");
  return res.data;
};

/* ================================
   DAILY ACTIVITY (BAR CHART)
================================ */
export const getAdminActivity = async () => {
  const res = await api.get("/admin/dashboard/activity");
  return res.data;
};

/* ================================
   COURSE COMPLETION %
================================ */
export const getAdminCompletion = async () => {
  const res = await api.get("/admin/dashboard/completion");
  return res.data;
};
/* ================================
   MONTHLY REVENUE (FOR CHARTS)
================================ */
export const getAdminRevenue = async () => {
  const res = await api.get("/admin/dashboard/revenue");
  return res.data;
};

/* ================================
   TRANSACTIONS (FOR ABANDONED CARTS)
================================ */
export const getAdminTransactions = async (params = {}) => {
  const res = await api.get("/admin/dashboard/transactions", { params });
  return res.data;
};
/* ================================
   WEB PAGES (CMS)
================================ */
export const fetchWebPages = async () => {
  const res = await api.get("/admin/webpages");
  return res.data;
};

export const saveWebPage = async (payload) => {
  const res = await api.post("/admin/webpages", payload);
  return res.data;
};

export const deleteWebPage = async (id) => {
  const res = await api.delete(`/admin/webpages/${id}`);
  return res.data;
};

/* ================================
   BLOG MANAGEMENT (CMS)
================================ */
export const fetchBlogPosts = async () => {
  const res = await api.get("/admin/blog");
  return res.data;
};

export const saveBlogPost = async (payload) => {
  const res = await api.post("/admin/blog", payload);
  return res.data;
};

export const deleteBlogPost = async (id) => {
  const res = await api.delete(`/admin/blog/${id}`);
  return res.data;
};

export const getBlogStats = async () => {
  const res = await api.get("/admin/blog/stats");
  return res.data;
};

/* ================================
   PROFILE & SECURITY
================================ */
export const updateAdminProfile = async (payload) => {
  const res = await api.patch("/admin/profile", payload);
  return res.data;
};

export const changeAdminPassword = async (payload) => {
  const res = await api.patch("/admin/change-password", payload);
  return res.data;
};
