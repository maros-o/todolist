import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import proxy from "../global/proxy";

const AddNote = ({ setNotes }) => {
  const { authTokens } = useContext(AuthContext);

  const createNote = async (e) => {
    e.preventDefault();
    console.log("createNote - called");
    const bodyValue = e.target.body.value;
    e.target.reset();
    let response = await fetch(proxy+"/api/notes/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        body: bodyValue,
      }),
    });
    let data = await response.json();

    if (response.status === 201) {
      console.log("createNote - success");
      setNotes(data);
    } else {
      console.log("createNote - failed");
    }
    console.log("createNote response:", data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={createNote}
      sx={{ mt: 1 }}
      display="flex"
      flexDirection="row"
    >
      <TextField
        variant="standard"
        margin="normal"
        name="body"
        label="Add New"
        autoFocus
        fullWidth
      />
      <IconButton
        type="submit"
        variant="contained"
        sx={{ my: 3, ml: 1 }}
        edge="end"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AddNote;
