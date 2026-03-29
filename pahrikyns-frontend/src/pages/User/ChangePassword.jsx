import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { changePassword } from "../../api/auth";

export default function ChangePassword() {
  const { token } = useAuth();
  const [data, setData] = useState({ oldPassword: "", newPassword: "" });

  const submit = async () => {
    await changePassword(data, token);
    alert("Password Updated!");
  };

  return (
    <div>
      <h2>Change Password</h2>

      <input type="password" placeholder="Old Password"
        onChange={(e) => setData({ ...data, oldPassword: e.target.value })} />

      <input type="password" placeholder="New Password"
        onChange={(e) => setData({ ...data, newPassword: e.target.value })} />

      <button onClick={submit}>Update</button>
    </div>
  );
}
