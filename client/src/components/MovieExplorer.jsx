import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import MovieCard from "./MovieCard";

function MovieExplorer() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const searchInputRef = useRef(null);

  const getAllMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://movie-explorer-backend-ten.vercel.app/get_movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get("https://movie-explorer-backend-ten.vercel.app/search", {
        params: { title },
      });
      setMovies(response.data.results);
      setTitle("");
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ padding: "1rem" }}>
      <Typography variant="h2" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Sora, sans-serif", color: "#C39898", marginTop: "2rem", marginBottom: "2rem" }}>
        Movie Explorer
      </Typography>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2} style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Grid item xs={12} md={8}>
            <TextField
              label="Search by Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputRef={searchInputRef}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", width: "100%" }}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <Grid container spacing={2}>
          {movies.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", width: "100%" }}>
              <Typography variant="h3">No movies found</Typography>
            </div>
          ) : (
            movies.map((movie, index) => (
              <Grid item xs={12} key={movie.id}>
                <MovieCard movie={movie} ind={index} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
}

export default MovieExplorer;
