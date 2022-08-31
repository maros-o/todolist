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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    let register = true;
    e.preventDefault();

    if (e.target.username.value.length < 5) {
      setUsernameError(true);
      register = false;
    } else setUsernameError(false);

    if (!validateEmail(e.target.email.value)) {
      setEmailError(true);
      register = false;
    } else setEmailError(false);

    if (e.target.password.value.length < 8) {
      setPasswordError(true);
      register = false;
    } else setPasswordError(false);

    if (register) registerUser(e, setOpen);
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
          <AccountCircleOutlinedIcon sx={{ backgroundColor: "#d4f0ff" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            error={emailError}
            helperText={emailError ? "Invalid email " : ""}
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
              Username already exists
            </Alert>
          </Collapse>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
