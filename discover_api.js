const { google } = require('googleapis')
const moment = require('moment-timezone');
const _ = require("lodash"); 

const getGSC = async () => {
    let from = moment().subtract(9, 'days').tz('America/Los_Angeles').format("YYYY-MM-DD")
    let to = moment().subtract(2, 'days').tz('America/Los_Angeles').format("YYYY-MM-DD")
    console.log(from)
    console.log(to)

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/webmasters']})
    const gsc = await google.searchconsole({ version: 'v1', auth });
  
    let rows = []
    try {
        const res = await gsc.searchanalytics.query({
            siteUrl: "https://www.blick.ch", 
            requestBody: {
                startDate: from, 
                endDate: to, 
                dimensions: ["page"],
                type: "discover"
            }
        })
        rows = rows.concat(res.data.rows)
    } catch (error) {
        console.log("Search API error")
    }
    rows = _.orderBy( rows, 'impressions', "desc");
    console.log(rows)
  };

  getGSC()