import User from "../models/User";
import { registerValidate, loginValidate } from "../validations/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Types } from "mongoose";

export const Register = async (req, res, next) => {
  try {
    const { name, username, password, email, confirmPassword, phone } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Xác nhận mật khẩu không đúng",
      });
    }

    const { error } = registerValidate.validate(
      { name, username, password, email, confirmPassword, phone },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(400).json({
        message: "Username đã tồn tại",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      confirmPassword: hashedPassword,
      phone,
    });

    newUser.password = undefined; // Xóa password trước khi gửi response

    res.status(201).json({
      message: "Thêm người dùng thành công",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate input data
    const { error } = loginValidate.validate(
      { username, password },
      { abortEarly: false }
    );
    if (error) {
      return res.status(400).json({
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Tên người dùng không tồn tại",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không chính xác",
      });
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: 3600,
    });

    user.password = undefined;

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      data: user,
    });
  } catch (error) {
    next();
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const data = await User.findOne(new Types.ObjectId(req.user.userId));
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(data);
  } catch (error) {
    next();
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra khi đăng xuất" });
      } else {
        console.log("Session deleted successfully");
        return res.status(200).json({ message: "Đăng xuất thành công" });
      }
    });
  } catch (error) {
    next();
  }
};
