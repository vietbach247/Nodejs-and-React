import { useEffect, useState } from "react";
import { User } from "../types/User";
import constant from "../axios";

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
        const response = await constant.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError("Lỗi khi lấy thông tin người dùng");
        console.error("Error fetching user profile:", error);
      }
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
