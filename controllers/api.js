const express = require("express");
const router = express.Router();
const db = require("../models");
const request = require("request"); //Makes http calls
const cheerio = require("cheerio");
var axios = require("axios");

// router.get("/", function(req, res) {
//     res.redirect("/movies");
//   });

// A GET route for scraping the IMDB website
router.get("/scrape", (req, res) => {
    // console.log("scrape ran")
    // First, we grab the body of the html with axios
  axios.get("https://www.imdb.com/chart/moviemeter?ref_=nv_mv_mpm").then(function(response) {
    //   console.log(response)
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // console.log(response.data)
    // console.log($('.titleColumn'))
            // Now, we grab every article:
            $(".titleColumn").each(function (i, element) {
// console.log(".titleColumn")
                // Save an empty result object
                // let count = i;
                let result = {};
                // Add the text and href of every link, and summary and byline, saving them to object
                result.title = $(this)
                    .children("a")
                    .text().trim();
                result.link = $(this)
                    .children("a")
                    .attr("href");
                result.year = $(element).find(".secondaryInfo").text().trim();
                
                
           // Create a new Movie using the `result` object built from scraping
      db.Movie.create(result)
      .then(function(dbMovie) {
        // View the added result in the console
        console.log(dbMovie);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  // Send a message to the client
//   res.send("Scrape Complete");
  res.redirect("/movies");

  
});

});

// Route for getting all Movies from the db
router.get("/movies", function(req, res) {
    // Grab every document in the Articles collection
    db.Movie.find({})
      .then(function(dbMovie) {
          res.render("movies", {movies: dbMovie});
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbMovie);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

module.exports = router;