import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import React, { useState, useEffect } from "react";

import { API } from "../api/api";

import StudentCard from "./StudentCard";

const Home = () => {
  const [students, setStudents] = useState([]);

  function GetStudents() {
    fetch(`${API}`, {
      method: "GET",
    }).then((res) => res.json().then((data) => setStudents(data)));
  }
  useEffect(() => {
    GetStudents();
  }, []);

  function DeleteStudent(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => GetStudents());
  }

  return (
    <Container className="container" minwidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
        >
          {students.map((student) => {
            return (
              <Grid key={student.id} item xs={3} sm={12} md={3}>
                <StudentCard
                  DeleteStudent={DeleteStudent}
                  data={student}
                  id={student.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;