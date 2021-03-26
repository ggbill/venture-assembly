const router = require('express').Router();
var Airtable = require('airtable');
require('dotenv').config()
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appOFy3z7xEZOaMmE');

router.get("/get-sdgs", async (req, res) => {
    // let tagList = []
    let recordList = []
    base('Sustainable Development Goals').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            // if (record.get('Tags')) {
            //     record.get('Tags').split(",").forEach(tag => {
            //         tagList.push(tag.trim())
            //     });
            // } 

            recordList.push(record)
        });
        
       
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
        // res.json(Array.from(new Set(tagList.sort())))
        res.json(recordList)
    });
});


export default router;