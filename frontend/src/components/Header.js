import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          href="/"
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
        >
          <NotesIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ ml: 1, flexGrow: 1 }}>
          MarList
        </Typography>
        {user ? <PersonIcon sx={{ m: 1 }} /> : null}
        {user ? (
          <Typography
            component="div"
            sx={{ mr: 4, fontSize: 18, color: "#f7f7f7" }}
          >
            {user.username}
          </Typography>
        ) : null}
        {user ? (
          <IconButton
            size="large"
            edge="end"
            aria-label="logout"
            onClick={logoutUser}
            color="inherit"
            sx={{ mr: -1 }}
          >
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton
            size="large"
            edge="end"
            aria-label="logout"
            href="/signin"
            color="inherit"
            sx={{ mr: -1 }}
          >
            <LoginIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
