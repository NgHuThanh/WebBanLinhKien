import {
  Box,
  Button,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";

interface User {
  username?: string;
  password?: string;
}
const firebaseConfig = {
  apiKey: "AIzaSyBZ5SZ2bS0qelHkeJBYXMQi7jUcKRbvoyw",
  authDomain: "weblinhkien-b9612.firebaseapp.com",
  projectId: "weblinhkien-b9612",
  storageBucket: "weblinhkien-b9612.appspot.com",
  messagingSenderId: "514113053206",
  appId: "1:514113053206:web:dd7546c647ddcb65facb37",
  measurementId: "G-L6ZHHGL5HV",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<User>({
    username: "abcd",
    password: "12345678",
  });
  const [error, setError] = useState<string>(""); // State để lưu thông báo lỗi

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

  const onLogin = async () => {

    const querySnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("username", "==", form.username),
        where("password", "==", form.password)
      )
    );
    if (querySnapshot.empty) {
      setError("Incorrect username or password!");
      return;
    }
    else {
      setCookie("user_id", querySnapshot.docs[0].id);
      router.push("/homegroup");
    }
  };
  

  function helperTextPassword() {
    if (!form.password) return "";

    if (form.password.length < 8) return "Password is invalid";

    return "";
  }

  const onCreateAccount = () => {
    router.push("/register");
  };

  return (
    <Box m={4}>
      <Typography sx={{color:"red"}}>{error}</Typography>
      <FormGroup>
        <Stack spacing={4}>
          <TextField
            label="Username"
            variant="outlined"
            defaultValue={form.username}
            error={!form.username}
            helperText={!form.username ? "Username is invalid" : ""}
            onChange={onChangeUsername}
            InputProps={{
              style: { color: "black", background: "rgba(0,0,0,0.1)" },
              placeholder: "Username",
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            defaultValue={form.password}
            error={form.password ? form.password.length < 8 : false}
            helperText={helperTextPassword()}
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
                    {showPassword ? (
                      <VisibilityOffOutlined style={{ color: "black" }} />
                    ) : (
                      <Visibility style={{ color: "black" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={onLogin}
            style={{ backgroundColor: "black", color: "white" }}
            endIcon={<ArrowForwardIcon style={{ color: "white" }} />}
          >
            SIGN IN
          </Button>
          <Button
            variant="text"
            onClick={
              onCreateAccount
          
            }
            style={{ backgroundColor: "gray", color: "black" }}
          >
            Create an account
          </Button>
        </Stack>
      </FormGroup>
    </Box>
  );
};

export default LoginPage;
