const axios = require('axios');
const cheerio = require('cheerio');


const getUrls = async () => {
	try {
		const { data } = await axios.get(
			'http://catalog.illinois.edu/undergraduate/'
		);
		const $ = cheerio.load(data);
		let scrapedUrls = [];
		$("div[id='atozindex'] a").each((_idx, el) => {
			const eachScrape = $(el).attr('href')
			scrapedUrls.push(eachScrape)
		});
		scrapedUrls = scrapedUrls.filter(url => url != '#header')
		scrapedUrls = scrapedUrls.filter(url => url != undefined)
		scrapedUrls = scrapedUrls.map(url => 'http://catalog.illinois.edu'+url+'#degreerequirementstext' )
		return scrapedUrls;
	} catch (error) {
		throw error;
	}
};

getUrls()
    .then((scrapedUrls) => console.log(scrapedUrls));




// const scrape = async (getUrls) => {
// 	try {
// 		console.log(getUrls)
// 		const { data } = await axios.get(


// 		 `http://catalog.illinois.edu${scrapedUrls}#degreerequirementstext`
// 		);
// 		const $ = cheerio.load(data);
// 		const scrapedData = [];

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





