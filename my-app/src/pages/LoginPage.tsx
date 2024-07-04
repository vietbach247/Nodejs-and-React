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

type Props = {
  onUser: (userData: User) => Promise<void>;
};

const LoginPage: React.FC<Props> = ({ onUser }) => {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onUser(formData);
    } catch (error: any) {
      if (
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

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Avatar sx={{ bgcolor: "secondary.main", mx: "auto" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
          Đăng nhập
        </Typography>
        {errors.form && (
          <Typography color="error" align="center">
            {errors.form}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
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
