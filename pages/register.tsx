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
    confirmPassword?: string;
    email?: string;
    address?: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const [form, setForm] = useState<User>({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        address: ''
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

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            email: e.currentTarget.value
        });
    };

    const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            address: e.currentTarget.value
        });
    };

    const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            confirmPassword: e.currentTarget.value
        });
    };

    const onRegister = () => {
        axios
            .post("https://dummyjson.com/auth/register", {
                username: form.username,
                password: form.password,
                email: form.email
            })
            .then((res) => {
                setCookie("sessionId", true);
                router.push("/login");
            });
    };

    function helperTextPassword() {
        if (!form.password)
            return ""

        if (form.password.length < 8)
            return "Password is invalid"

        return ""
    }

    function helperTextConfirmPassword() {
        if (!form.confirmPassword)
            return ""

        if (form.password !== form.confirmPassword)
            return "Passwords do not match"

        return ""
    }

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
                            style: { color: 'black', background: 'rgba(0,0,0,0.1)' },
                            placeholder: "Username"
                        }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={form.email}
                        onChange={onChangeEmail}
                        InputProps={{
                            style: { color: 'black', background: 'rgba(0,0,0,0.1)' },
                            placeholder: "Email"
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
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
                                        {showPassword ? <VisibilityOffOutlined /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        value={form.confirmPassword}
                        error={form.confirmPassword !== form.password}
                        helperText={helperTextConfirmPassword()}
                        onChange={onChangeConfirmPassword}
                        InputProps={{
                            style: { color: 'black', background: 'rgba(0,0,0,0.1)' },
                            placeholder: "Confirm Password"
                        }}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        value={form.address}
                        onChange={onChangeAddress}
                        InputProps={{
                            style: { color: 'black', background: 'rgba(0,0,0,0.1)' },
                            placeholder: "Address"
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={onRegister}
                        endIcon={<ArrowForwardIcon />}
                    >
                        SIGN UP
                    </Button>
                </Stack>
            </FormGroup>
        </Box>
    );
};

export default RegisterPage;
