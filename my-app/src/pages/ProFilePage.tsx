import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import constant from "../axios";
import axios from "axios";

const ProFilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vui lòng đăng nhập");
        return;
      }

      try {
        const response = await constant.get("/auth/profile");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {}
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (!user) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <h1>Trang Hồ Sơ</h1>
      <p>Họ và tên: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Tên người dùng: {user.username}</p>
    </div>
  );
};

export default ProFilePage;
