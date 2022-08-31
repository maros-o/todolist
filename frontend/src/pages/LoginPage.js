import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Link,
  Avatar,
  TextField,
  Grid,
  Container,
  Collapse,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    let login = true;
    e.preventDefault();

    if (e.target.username.value.length < 5) {
      setUsernameError(true);
      login = false;
    } else setUsernameError(false);

    if (e.target.password.value.length < 8) {
      setPasswordError(true);
      login = false;
    } else setPasswordError(false);

    if (login) loginUser(e, setOpen);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 1 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
        sx={{ mt: 5 }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#d4f0ff" }}>
          <LockOutlinedIcon sx={{ backgroundColor: "#d4f0ff" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
            error={usernameError}
            helperText={
              usernameError
                ? "Username must be at least 5 characters long "
                : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            helperText={
              passwordError
                ? "Password must be at least 8 characters long "
                : ""
            }
          />
          <Collapse in={open} sx={{ mb: 0, pb: 0 }}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mt: 1, mb: 0 }}
            >
              Invalid Username or Password
            </Alert>
          </Collapse>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
