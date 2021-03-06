const router = require('express').Router();
var Airtable = require('airtable');
require('dotenv').config()
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appOFy3z7xEZOaMmE');

router.get("/get-sdgs", async (request, response) => {
    // let tagList = []
    let recordList = []
    base('Sustainable Development Goals').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            recordList.push(record)
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) {
            console.log(err)
            response.status(404).send(err);
        } else {
            response.json(recordList)
        }
        // res.json(Array.from(new Set(tagList.sort())))

    });
});

router.get("/get-targets/:targetListCsv", async (request, response) => {
    // let targetList = request.params.targetListCsv.split(",")
    // console.log(`IF(FIND({SDG ID},"${request.params.targetListCsv}")>0, TRUE(), FALSE())`)
    let recordList = []
    base('Targets').select({
        view: "Grid view",
        filterByFormula: `IF(FIND({SDG ID},"${request.params.targetListCsv}")>0, TRUE(), FALSE())`
    }).eachPage(function page(records, fetchNextPage) {
   
        records.forEach(function (record) {
            recordList.push(record)
        });
    
        fetchNextPage();
    
    }, function done(err) {
        if (err) {
            console.log(err)
            response.status(404).send(err);
        } else {
            response.json(recordList)
        }
        // res.json(Array.from(new Set(tagList.sort())))

    });
});

export default router;