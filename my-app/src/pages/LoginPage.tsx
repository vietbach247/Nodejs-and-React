import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { User } from "../types/User";
import constant from "../axios";
import { useNavigate } from "react-router-dom";

type Props = {};

const LoginPage: React.FC<Props> = ({}) => {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (userData: User) => {
    try {
      const response = await constant.post("/auth/login", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors: { [key: string]: string } = {};
        error.response.data.errors.forEach((err: any) => {
          validationErrors[err.param] = err.msg;
        });
        setErrors(validationErrors);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: "Có lỗi xảy ra, vui lòng thử lại" });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    await handleLogin(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Avatar sx={{ bgcolor: "secondary.main", mx: "auto" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors?.username}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={
              errors.password && (
                <span className="text-danger">{errors.password}</span>
              )
            }
          />
          {errors.form && (
            <Typography color="error" align="center">
              {errors.form}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
