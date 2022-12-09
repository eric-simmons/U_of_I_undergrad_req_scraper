const axios = require('axios');
const cheerio = require('cheerio');


// $('a').attr('href'); // gets the actual value
// $('a').prop('href')


const getUrls = async () => {
	try {
		const { data } = await axios.get(
			'http://catalog.illinois.edu/undergraduate/'
		);
		const $ = cheerio.load(data);
		let scrapedData = [];
		$("div[id='atozindex'] a").each((_idx, el) => {
			const eachScrape = $(el).attr('href')
			scrapedData.push(eachScrape)
		});

		scrapedData = scrapedData.filter(url => url != '#header')
		scrapedData = scrapedData.filter(url => url != undefined)
		// console.log(scrapedData)




		return scrapedData;
	} catch (error) {
		throw error;
	}


};

getUrls()
    .then((scrapedData) => console.log(scrapedData));




// const scrape = async () => {
// 	try {
// 		const { data } = await axios.get(
// 			'http://catalog.illinois.edu/undergraduate/bus/accountancy-bs/#degreerequirementstext'
// 		);
// 		const $ = cheerio.load(data);
// 		const  scrapedData= [];

// 		$('.courselistcomment').each((_idx, el) => {
// 			const eachScrape = $(el).text()
// 			scrapedData.push(eachScrape)
// 		});

// 		return scrapedData;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// scrape()
//     .then((scrapedData) => console.log(scrapedData));



	//written by openAI

// // async function scrapeData() {
// //   const urls = ["http://catalog.illinois.edu/undergraduate/bus"];
// //   const promises = urls.map(async url => {
// //     try {
// //       const response = await axios.get(url);
// //       const html = response.data;
// //       const cssQuery = ".courselistcomment";
// //       const cheerio = require("cheerio");
// //       const $ = cheerio.load(html);
// //       const data = $(cssQuery).text();
// //       return data;
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   });
// //   const results = await Promise.all(promises);
// //   console.log(results);
// // }

// // scrapeData();


