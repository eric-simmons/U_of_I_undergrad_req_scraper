const axios = require('axios');
const cheerio = require('cheerio');

//get all links from this page where $("div[id='atozindex'] a")

const parent = 'http://catalog.illinois.edu/undergraduate/'

const scrape = async (url) => {
	try {
		const { data } = await axios.get(url)
		const $ = cheerio.load(data)
		const scrapedData = []
		$('.courselistcomment').each((_idx, el) => {
			const eachScrape = $(el).text()
			scrapedData.push(eachScrape)
		});
	} catch (error) {
		throw error;
	}
};


const getUrls = async (url) => {
	try {
		//get parent url links
		const { data } = await axios.get(url)
		const $ = cheerio.load(data)

		let scrapedUrls = []
		$("div[id='atozindex'] a").each((_idx, el) => {
			const eachScrape = $(el).attr('href')
			scrapedUrls.push(eachScrape)
		});
		//build formated array of links
		scrapedUrls = scrapedUrls.filter(url => url != '#header')
		scrapedUrls = scrapedUrls.filter(url => url != undefined)
		scrapedUrls = scrapedUrls.map(url => 'http://catalog.illinois.edu' + url + '#degreerequirementstext')


		const hey = scrapedUrls.forEach(element => scrape(element))
		console.log(hey)

		//  return scrapedUrls;
	} catch (error) {
		throw error;
	}
};

getUrls(parent)






