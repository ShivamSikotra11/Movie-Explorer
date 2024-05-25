const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json());
// app.use(cors());
app.use(cors(
  {
    origin:["https://movie-explorer-backend-ten.vercel.app","http://localhost:8000","https://movie-explorer-webapp.netlify.app","http://localhost:5173"],
    methods:["GET","POST"],
    credentials:true
  }
));


const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzFlODlhMTIyMjcxZmMwMTNlMmM2NjdkNzRiYzNmOSIsInN1YiI6IjY2NTA1MDYyYWJkODlmMjA4N2VjNGE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LdENaZFUSJJTiDfA6EERmCmzbH7K5JLHztVwHIOE9eE";
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${apiKey}`,
};

app.get("/get_movies", async (req, res) => {
  try {
    const page1Url = "https://api.themoviedb.org/3/movie/popular?page=1";
    const page2Url = "https://api.themoviedb.org/3/movie/popular?page=2";

    // Fetch both pages simultaneously
    const [response1, response2] = await Promise.all([
      axios.get(page1Url, { headers }),
      axios.get(page2Url, { headers }),
    ]);

    // Combine results from both pages
    const combinedData = [...response1.data.results, ...response2.data.results];

    // Send the combined data as a response
    res.json(combinedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while fetching the movies.");
  }
});

app.get('/search', async (req, res) => {
  const { title } = req.query;
  const apiKey = '031e89a122271fc013e2c667d74bc3f9';
  let url = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send("Movie Explorer connected");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});