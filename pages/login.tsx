import { Box, Button, FormGroup, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface User {
  username?: string;
  password?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<User>({
    username: 'abcd',
    password: "12345678"
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: e.currentTarget.value
    });
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      username: e.currentTarget.value
    });
  };

  const onLogin = () => {
    axios
      .post("https://dummyjson.com/auth/login", {
        username: form.username,
        password: form.password
      })
      .then((res) => {
        setCookie("sessionId", true);
        router.push("/cart");
      });
  };

  function helperTextPassword() {
    if (!form.password)
      return ""

    if (form.password.length < 8)
      return "Password is invalid"

    return ""
  }

  const onCreateAccount = () => {
    // Redirect to create account page or perform any action needed for account creation
  };

  return (
    <Box m={4}>
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
              style: { color: 'black', background: 'rgba(0,0,0,0.1)' },
              placeholder: "Username"
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            defaultValue={form.password}
            error={form.password ? form.password.length < 8 : false}
            helperText={helperTextPassword()}
            onChange={onChangePassword}
            InputProps={{
              style: { color: 'black', background: 'rgba(0,0,0,0.1)' },
              placeholder: "Password",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOffOutlined style={{ color: 'black' }} /> : <Visibility style={{ color: 'black' }} />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            onClick={onLogin}
            style={{ backgroundColor: 'black', color: 'white' }}
            endIcon={<ArrowForwardIcon style={{ color: 'white' }} />}
          >
            SIGN IN
          </Button>
          <Button
            variant="text"
            onClick={onCreateAccount}
            style={{ backgroundColor: 'gray', color: 'black' }}

          >
            Create an account
          </Button>
        </Stack>
      </FormGroup>
    </Box>
  );
};

export default LoginPage;
