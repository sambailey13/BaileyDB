const express = require("express");
const app = express();
const fetch = require("node-fetch");
const { request, response } = require("express");
const { Client } = require("pg");
const serveIndex = require("serve-index");
const https = require("https");
const fs = require("fs");

const port = process.env.PORT || 3001;

const privateKey = fs.readFileSync(
  "C:/Certbot/live/bailey-db.xyz/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "C:/Certbot/live/bailey-db.xyz/cert.pem",
  "utf8"
);
const ca = fs.readFileSync("C:/Certbot/live/bailey-db.xyz/chain.pem", "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

app.use(express.static("public"));
app.use(
  "/.well-known",
  express.static(".well-known"),
  serveIndex(".well-known")
);
app.use(express.static(__dirname, { dotfiles: "allow" }));

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://bailey-db.xyz");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Start - TMDB API Requests

//Start - TMDB API Details

const api_key = "?api_key=057e7877a424022e9056bf05e0598fac";
const api_url = "https://api.themoviedb.org/3";

//End - TMDB API Details

//Start - Search Requests

app.get("/get_search/:query", async (request, response) => {
  const query = request.params.query;
  try {
    var searchUrl = api_url + "/search/multi" + api_key + "&query=" + query;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

//End - Search Requests

//Start - Home Page Requests

app.get("/get_movie_popular", async (request, response) => {
  try {
    var searchUrl = api_url + "/movie/popular" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_tv_popular", async (request, response) => {
  try {
    var searchUrl = api_url + "/tv/popular" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_person_popular", async (request, response) => {
  try {
    var searchUrl = api_url + "/person/popular" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

//End - Home Page Requests

//Start - Expand Requests - Movie Requests

app.get("/get_movie_details/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/movie/" + id + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_movie_images/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/movie/" + id + "/images" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_movie_credits/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/movie/" + id + "/credits" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_movie_externals/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/movie/" + id + "/external_ids" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_movie_videos/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/movie/" + id + "/videos" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_movie_reviews/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/movie/" + id + "/reviews" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_movie_similar/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/movie/" + id + "/similar" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

//End - Expand Requests -  Movie Requests

//Start - Expand Requests -  TV Requests

app.get("/get_tv_details/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/tv/" + id + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_tv_images/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/tv/" + id + "/images" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_tv_credits/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/tv/" + id + "/credits" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_tv_videos/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/tv/" + id + "/videos" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_tv_reviews/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/tv/" + id + "/reviews" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_tv_similar/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/tv/" + id + "/similar" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

//End - Expand Requests -  TV Requests

//Start - Expand Requests -  Person Requests

app.get("/get_person/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/person/" + id + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_person_credits/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/person/" + id + "/combined_credits" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_person_images/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/person/" + id + "/images" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

app.get("/get_person_externals/:id", async (request, response) => {
  const id = request.params.id;
  try {
    var searchUrl = api_url + "/person/" + id + "/external_ids" + api_key;
    const fetch_response = await fetch(searchUrl);
    const json = await fetch_response.json();
    response.json(json);
  } catch (err) {
    response.json("Error Ecountered: " + err);
  }
});

//End - Expand Requests -  Person Requests

//End - TMDB API

//Start - Connect to Postgres DB

const client = new Client({
  user: "postgres",
  password: "hanwell",
  host: "localhost",
  port: 5500,
  database: "moviedb",
});

client.connect();

// Start - Watch List

app.get("/get_watch_list/:userId", async (request, response) => {
  const userId = request.params.userId;
  try {
    const result = await client.query(
      `SELECT movieid as id, concat('/',movieimage) as poster_path, moviename as name, mediatype as media_type FROM public."userWatchList" WHERE userid = '${userId}'`
    );
    response.send(result.rows);
  } catch (err) {
    response.send({ message: `"Failed to Retrieve Watch List: ${err}"` });
  }
});

app.get(
  "/add_to_watch_list/:userId/:movieId/:movieImage/:movieName/:mediaType",
  async (request, response) => {
    //client.connect();
    console.log("connected");
    const userId = request.params.userId;
    const movieId = request.params.movieId;
    const movieImage = request.params.movieImage;
    const movieName = request.params.movieName;
    const mediaType = request.params.mediaType;
    try {
      const result = await client.query(
        `INSERT INTO public."userWatchList"("userid","movieid","movieimage","moviename","mediatype") VALUES ('${userId}','${movieId}','${movieImage}','${movieName}','${mediaType}')`
      );
      response.send({ message: "added to watch list" });
    } catch (err) {
      response.send({ message: "failed to add to watch list" });
    }
  }
);

app.get(
  "/remove_from_watch_list/:userId/:movieId",
  async (request, response) => {
    const userId = request.params.userId;
    const movieId = request.params.movieId;
    try {
      const result = await client.query(
        `DELETE FROM public."userWatchList" WHERE userid = '${userId}' AND movieid = '${movieId}'`
      );
      if (result.rowCount > 0) {
        response.send({ message: "Removed from watch list" });
      } else {
        response.send({ message: "Failed to remove from watch list" });
      }
    } catch (err) {
      response.send({ message: "Failed to remove from watch list" });
    }
  }
);

// End - Watch List

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3001, () => {
  console.log("HTTPS server running on port 3001");
});
