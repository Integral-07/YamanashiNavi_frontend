/* eslint-disable */

'use client'

import{
    createTheme,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    ThemeProvider,
    Typography,
}from "@mui/material";

import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import { useState } from "react";
import axios from "axios";

type FormData = {
    username: string;
    password: string;
};

export default function Page(){
    const{
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const[authError, setAuthError] = useState("");
    const [userId, setUserId] = useState<string>(""); // userIdを状態で保持
    const router = useRouter();


    const defaultTheme = createTheme();

    const onSubmit = (event: any): void => {
        const data: FormData = {
            username : event.username,
            password : event.password,
        };

        handleLogin(data);
    };

    const handleLogin = (data: FormData) => {

        axios.post("/api/with_chatGPT/login", data)
        .then((response) => {

            setUserId(response.data); // レスポンスからuser_idを取得

            setUserId(userId); // 状態に保存

            // localStorageにuser_idを保存して、ページリロード後も保持
            localStorage.setItem("user_id", userId);

            router.push("/yamanashi_navi");
        })
        .catch(function(){
            setAuthError("ユーザ名またはパスワードが間違っています！");
        });
    };

    return(
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignitem: "center",
                    }}
                    >
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            {authError && (
                                <Typography variant="body2" color="error">
                                    {authError}
                                </Typography>
                            )}{""}
                            <TextField
                                type="text"
                                id="username"
                                variant="filled"
                                label="ユーザネーム（必須）"
                                fullWidth
                                margin="normal"
                                {...register("username", { required: "必須入力です"})}
                                error={Boolean(errors.username)}
                                helperText={errors.username?.message?.toString() || ""}
                            />
                            <TextField
                                type="password"
                                id="password"
                                variant="filled"
                                label="パスワード（必須）"
                                autoComplete="current-password"
                                fullWidth
                                margin="normal"
                                {...register("password", {
                                    required: "必須入力です",
                                    minLength: {
                                        value: 8,
                                        message: "8文字以上の文字列にしてください"
                                    },
                                })}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message?.toString() || ""}
                            />
                            <Button 
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, md: 2}}
                            >
                                ログイン
                            </Button>
                        </Box>
                    </Box>
            </Container>
        </ThemeProvider>
    )
}