"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";
import axios from "@/plugin/axios";
import { useRouter } from "next/navigation";

export default function NaviLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // 初期値をnullに変更して読み込み状態を管理
  const router = useRouter(); 

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/web/isauth");
      console.log(response)
      if (response.status === 200) {
        setIsAuth(true); // 認証OK
      } else {
        setIsAuth(false); // 認証失敗
      }
    } catch (error) {
      console.error("認証エラー:", error);
      setIsAuth(false); // 認証失敗
    }
  };

  const handleLogout = async () => {
    await axios.post("/api/web/logout"); // ログアウトリクエストを送信
    checkAuth();
    router.push("/yamanashi_navi/login"); // ログアウト後にログイン画面にリダイレクト
  };

  useEffect(() => {

    checkAuth();
    console.log("isAuth", isAuth);
  }, [isAuth]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Yamanashi Navi
          </Typography>

          {isAuth === true ? ( // isAuthがtrueの場合に表示
            <Button variant="contained" startIcon={<LogoutIcon />} onClick={handleLogout}>
              ログアウト
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Toolbar />
          <Divider />
          <List>
            <ListItem component="a" href="/yamanashi_navi" disablePadding>
              <ListItemButton>
                <ListItemText primary="Web版" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem component="a" href="/yamanashi_navi/line_qr" disablePadding>
              <ListItemButton>
                <ListItemText primary="LINE版" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
          width: "100%",
          background: "white",
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          width: "100%",
          position: "fixed",
          textAlign: "center",
          bottom: 0,
          background: "#1976d2",
        }}
      >
        <Typography variant="caption" color="white">
          @2024 Fujisan.py
        </Typography>
      </Box>
    </Box>
  );
}
