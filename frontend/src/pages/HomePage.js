import React, { useState, useEffect, useContext, useRef } from "react";
import AddNote from "../components/AddNote";
import AuthContext from "../context/AuthContext";
import NoteItem from "../components/NoteItem";
import { Typography, Box, Container, List, Divider } from "@mui/material";
import proxy from "../global/proxy";

const HomePage = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  const loading = useRef(true);

  useEffect(() => {
    console.log("notes REFRESH");
  }, [notes]);

  const predictNoteDelete = (id) => {
    let predict = notes.filter((x) => {
      return x.id !== id;
    });
    console.log("notes delete predict");
    setNotes(predict);
  };

  useEffect(() => {
    if (!loading.current) return;
    loading.current = false;

    const getNotes = async () => {
      console.log("getNotes - called");
      let response = await fetch(proxy + "/api/notes/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      let data = await response.json();

      if (response.status === 200) {
        console.log("getNotes - success");
        setNotes(data);
      } else if (response.statusText === "Unauthorized") {
        console.log("getNotes - unautorized getNotes");
        logoutUser();
      }
      console.log(data);
    };

    getNotes();

  }, [authTokens, logoutUser]);

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Box
          backgroundColor="#272727"
          sx={{ p: 4, borderRadius: "0.5em", width: "100%" }}
        >
          <Typography variant="h4"> To-Do List </Typography>
          <AddNote notes={notes} setNotes={setNotes} />
          <List>
            {notes.map((note) => (
              <div key={note.id}>
                <NoteItem note={note} predictNoteDelete={predictNoteDelete} />
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
