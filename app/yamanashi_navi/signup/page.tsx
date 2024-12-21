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
    const router = useRouter();

    const defaultTheme = createTheme();
    
        const onSubmit = (event: any): void => {
            const data: FormData = {
                username : event.username,
                password : event.password,
            };
    
            handleSignup(data);
        };

    const handleSignup = (data: FormData) => {

        axios.post("/api/with_chatGPT/signup", data)
        .then((response) => {
    
            router.push("/yamanashi_navi");
        })
        .catch(function(error){
            setAuthError("正常に登録できませんでした");
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
                        <TextField
                            type="text"
                            id="username"
                            variant="filled"
                            label="ユーザネーム"
                            fullWidth
                            margin="normal"
                            {...register("username", { required: "必須入力です"})}
                            error={Boolean(errors.username)}
                            helperText={errors.username?.message?.toString() || ""}
                        />
                        <TextField
                            type="email"
                            id="email"
                            variant="filled"
                            label="メールアドレス"
                            fullWidth
                            margin="normal"
                            {...register("email", {
                                required: "必須入力です"
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message?.toString() || ""}
                        />
                        <TextField
                            type="password"
                            id="password"
                            variant="filled"
                            label="パスワード"
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
                        <TextField
                            type="password"
                            id="password_conf"
                            variant="filled"
                            label="パスワード（確認用）"
                            autoComplete="current-password"
                            fullWidth
                            margin="normal"
                            {...register("password_conf", {
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
                            サインアップ
                        </Button>
                    </Box>
                </Box>
        </Container>
    </ThemeProvider>
    )
}