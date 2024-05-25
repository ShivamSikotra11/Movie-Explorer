import React from "react";
import { Card, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 350,
  },
  content: {
    padding: theme.spacing(2),
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2), // or '1rem' if you prefer
    },
  },
}));

const CardContentComponent = ({ movie, classes }) => {
  // Renamed to avoid confusion with the built-in CardContent
  return (
    <CardContent className={classes.content}>
      <Typography variant="h5" fontSize={"2.5rem"}>
        {movie.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {movie.release_date} | {movie.vote_average} / 10 ({movie.vote_count}{" "}
        votes)
      </Typography>
      <Typography variant="body1" paragraph>
        {movie.overview}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Original Language: {movie.original_language.toUpperCase()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Popularity: {movie.popularity}
      </Typography>
    </CardContent>
  );
};

const CardImageComponent = ({ movie, classes }) => {
  return (
    <CardMedia
      className={classes.media}
      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      title={movie.title}
    />
  );
};

function MovieCard({ movie, ind }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <CardImageComponent movie={movie} classes={classes} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContentComponent movie={movie} classes={classes} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default MovieCard;