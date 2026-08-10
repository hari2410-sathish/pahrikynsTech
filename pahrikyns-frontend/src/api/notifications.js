import API from "./axios";

// ✅ Fetch logged-in user's notifications (pagination + unread)
export const fetchNotifications = async (page = 1, limit = 20) => {
  const { data } = await API.get(`/api/notifications?page=${page}&limit=${limit}`);
  return data;
};

// ✅ Admin / System create notification
export const createNotificationAPI = async (payload) => {
  const { data } = await API.post("/api/notifications", payload);
  return data;
};

// ✅ Mark a notification as read
export const markNotificationReadAPI = async (id) => {
  const { data } = await API.put(`/api/notifications/${id}/read`);
  return data;
};

// ✅ Mark all notifications as read
export const markAllReadAPI = async () => {
  const { data } = await API.put("/api/notifications/read-all");
  return data;
};

// ✅ Delete a notification
export const deleteNotificationAPI = async (id) => {
  const { data } = await API.delete(`/api/notifications/${id}`);
  return data;
};
