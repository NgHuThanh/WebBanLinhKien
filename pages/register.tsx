import {
  Box,
  Button,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

interface User {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  address?: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<User>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: e.currentTarget.value,
    });
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      username: e.currentTarget.value,
    });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      email: e.currentTarget.value,
    });
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      address: e.currentTarget.value,
    });
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      confirmPassword: e.currentTarget.value,
    });
  };

  const hashPassword = async (password: string) => {
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt with a length of 10
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error;
    }
  };
  const firebaseConfig = {
    apiKey: "AIzaSyCxx2h_NqJOi3oFyQdK_kVHn9xVDp7bXRs",
    authDomain: "movieproject-2853c.firebaseapp.com",
    projectId: "movieproject-2853c",
    storageBucket: "movieproject-2853c.appspot.com",
    messagingSenderId: "475837657128",
    appId: "1:475837657128:web:da20b3d085c0c06dcf451d",
    measurementId: "G-WB3X8LMCBJ",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const onRegister = async () => {
    console.log("asd");
    try {
      const hashedPassword = await hashPassword(form.password || ""); // Hash the password
      await addDoc(collection(db, "users"), {
        username: "duy",
        address: "123/ads",
        email: "hidsgiifjk",
        password: "12352354656",
      });
      console.log("Registration successful");
      setCookie("sessionId", true);
      router.push("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  const handleAddToCart = () => {
    console.log("hello");
  };

  return (
    <Box m={4}>
      <FormGroup>
        <Stack spacing={4}>
          <TextField
            label="Username"
            variant="outlined"
            value={form.username}
            onChange={onChangeUsername}
            InputProps={{
              style: { color: "black", background: "rgba(0,0,0,0.1)" },
              placeholder: "Username",
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={form.email}
            onChange={onChangeEmail}
            InputProps={{
              style: { color: "black", background: "rgba(0,0,0,0.1)" },
              placeholder: "Email",
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={form.password}
            error={form.password ? form.password.length < 8 : false}
            onChange={onChangePassword}
            InputProps={{
              style: { color: "black", background: "rgba(0,0,0,0.1)" },
              placeholder: "Password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOffOutlined /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={form.confirmPassword}
            error={form.confirmPassword !== form.password}
            onChange={onChangeConfirmPassword}
            InputProps={{
              style: { color: "black", background: "rgba(0,0,0,0.1)" },
              placeholder: "Confirm Password",
            }}
          />
          <TextField
            label="Address"
            variant="outlined"
            value={form.address}
            onChange={onChangeAddress}
            InputProps={{
              style: { color: "black", background: "rgba(0,0,0,0.1)" },
              placeholder: "Address",
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddToCart}
            endIcon={<ArrowForwardIcon />}
          >
            SIGN UP
          </Button>
        </Stack>
      </FormGroup>
      <Button
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          display: "inline-flex",
          alignItems: "center",
          fontSize: "15px",
          marginLeft: "auto",
          width: "100%",
        }}
        onClick={handleAddToCart}
      >
        Add to carts
      </Button>
    </Box>
  );
};

export default RegisterPage;
