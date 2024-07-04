import React from "react";

type Props = {};

const PrivateRouter: React.FC<Props> = (props: Props) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : {};

  console.log("User data:", user.data);

  return (
    <div>
      <h1>Thông tin người dùng</h1>
      <p>Họ và tên: {user.data.name}</p>
      <p>Email: {user.email}</p>
      <p>Tên người dùng: {user.username}</p>
    </div>
  );
};

export default PrivateRouter;
