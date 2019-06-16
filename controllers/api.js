const express = require("express");
const router = express.Router();
const db = require("../models");
const request = require("request"); //Makes http calls
const cheerio = require("cheerio");
var axios = require("axios");



// A GET route for scraping the IMDB website
router.get("/scrape", (req, res) => {
    // console.log("scrape ran")
    // First, we grab the body of the html with axios
  axios.get("https://www.imdb.com/chart/moviemeter?ref_=nv_mv_mpm").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
            // Now, we grab every article:
            $('td .titleColumn').each(function (i, element) {
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
                
                
           // Create a new Article using the `result` object built from scraping
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
  res.send("Scrape Complete");
});
});


// app.get("/", function(req, res) {
//     res.render("index");
// });

module.exports = router;