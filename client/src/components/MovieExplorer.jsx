import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  searchContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  heading: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontFamily: '"Outfit", sans-serif',
  },
}));

function MovieExplorer() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const searchInputRef = useRef(null);

  const getAllMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/get_movies");
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
      const response = await axios.get("http://localhost:8000/search", {
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
    <Container className={classes.root}>
      {/* <Box className='mb-8 text-6xl  text-[#C39898]  font-outfit' > */}
      <Typography variant="h2" className={classes.heading}>
        Movie Explorer
      </Typography>
      {/* </Box> */}
      <form onSubmit={handleSearch}>
        <Grid container spacing={2} className={classes.searchContainer}>
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
          <Grid
            item
            xs={12}
            md={4}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button variant="contained" color="primary" fullWidth type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
          width="100%"
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {movies.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70vh"
              width="100%"
            >
              <Typography variant="h3">No movies found</Typography>
            </Box>
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
