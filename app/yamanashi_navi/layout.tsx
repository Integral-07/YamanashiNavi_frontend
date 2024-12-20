"use client";

import React, { useState, useEffect } from "react";
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
    TextField,
} from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";

type Message = {
    sender: "user" | "system";
    text: string;
};

export default function NaviLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Yamanashi Navi
                    </Typography>
                    <Button variant="contained" startIcon={<LogoutIcon />}>
                        ログアウト
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 240 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
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
