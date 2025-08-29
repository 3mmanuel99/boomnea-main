import axios from "axios"; // for api requests to wikipedia
import * as cheerio from "cheerio"; // for web scraping
import winkNLP from "wink-nlp"; // for question and answer formulating
import model from "wink-eng-lite-web-model" // english lite language model for browsers

/* phase param: different way questions and 
answers are formulated dependent on the phase

we are handling matters asynchronously as mul-
tiple gamerooms will need to fetch auto-generated
questions
*/
export async function natLangPro(phase: number)
{
    /* using the GET HTTP method to obtain the resource content.
    Wikipedia has a special link to output random Wikipedia pages
    */
    const response = await axios.get("https://en.wikipedia.org/wiki/Special:Random")
    // loads the response in HTML format, ready to scrape
    const $ = cheerio.load(response.data);
    // checks if there are tables which are not navboxes 
    if ($("table.wikitable:not(.navbox)").length > 0) {
            console.log("This page has tables!");
    } else {
        /* paragraphs are the main content in wikipedia pages
        we scrape these to make the questions in the first place
        */
        const paragraph = $("p")
        // .each iterates over a collection e.g an array
        .each(function() {
            // text from the paragraph HTML element
            const pText = $(this).text(); 
            const tText = pText.trim(); // trimming removes any unnecessary characters
            /* regex expression which makes a match for one or more number wrapped in square brackets, 
            'g' means global match (for the subject string) */
            const regex = new RegExp("\\[\\d+\\]", "g")
            let nCText = tText.replaceAll(regex, "") // outputs the new string without the citations

            const nlp = winkNLP(model); // instantiating wink-nlp
            const doc = nlp.readDoc(nCText)
            // ...

            
        });
    }
}
