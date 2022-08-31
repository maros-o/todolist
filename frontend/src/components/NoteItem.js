import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  Box,
  IconButton,
  TextField,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import proxy from "../global/proxy";

const NoteItem = ({ note, predictNoteDelete }) => {
  const { authTokens } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

  const deleteNote = async () => {
    console.log("deleteNote - called");
    predictNoteDelete(note.id);

    let response = await fetch(proxy+"/api/notes/delete/" + note.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    console.log("deleteNote response:", data);

    if (response.status === 200) {
      console.log("deleteNote - success");
      //setNotes(data);
    } else {
      console.log("deleteNote - failed");
      alert("Delete Error");
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    setEdit(false);
    note.body = e.target.body.value;
    if (note.body === "") {
      deleteNote();
      return;
    }
    console.log("updateNote - called");

    let response = await fetch(proxy+"/api/notes/update/" + note.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        note_body: e.target.body.value,
      }),
    });
    let data = await response.json();
    console.log("updateNote response:", data);

    if (response.status === 200) {
      console.log("updateNote - success");
      //setNotes(data);
    } else {
      console.log("updateNote - failed");
    }
  };

  if (!edit) {
    return (
      <ListItem>
        <ListItemButton
          sx={{ m: 0, p: 0, pl: 1 }}
          onClick={() => {
            setEdit(true);
          }}
        >
          <ListItemText primary={note.body} />
        </ListItemButton>
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => deleteNote()}
        >
          <DoneIcon />
        </IconButton>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <Box
          component="form"
          noValidate
          onSubmit={updateNote}
          sx={{ my: 0, py: 0, width: "100%" }}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <TextField
            label="Edit"
            name="body"
            autoFocus
            margin="normal"
            size="small"
            fullWidth
            defaultValue={note.body}
            variant="outlined"
            sx={{ my: 0, py: 0 }}
          />

          <IconButton
            edge="end"
            type="submit"
            variant="contained"
            sx={{ my: 0, py: 1, ml: 1 }}
          >
            <SaveIcon />
          </IconButton>
        </Box>
      </ListItem>
    );
  }
};

export default NoteItem;
