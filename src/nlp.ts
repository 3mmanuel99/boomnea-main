import axios from "axios";
import * as cheerio from "cheerio";
import nlp from "wink-nlp";

axios.get("https://en.wikipedia.org/wiki/Special:Random")
    .then(function(response) {
        const $ = cheerio.load(response.data);
        if ($("table.wikitable:not(.navbox)").length > 0) {
            console.log("This page has tables!");
        }
        else {
            const paragraph = $("p")
            .each(function() {
                const text = $(this).text();
                const cleanText = text.trim();

                const regex = new RegExp("\\[\\d+\\]", "g")
                let cleanerText = cleanText.replaceAll(regex, "")
                console.log(cleanerText);

                

            });
        }
});