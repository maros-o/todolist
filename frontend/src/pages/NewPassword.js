import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  Typography,
  Box,
  Button,
  Link,
  Avatar,
  TextField,
  Grid,
  Container,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const NewPassword = () => {
  const { registerUser } = useContext(AuthContext);

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
          <EmailIcon sx={{ backgroundColor: "#d4f0ff" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            send email
          </Button>
          <Grid container>
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

export default NewPassword;
