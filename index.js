const axios = require('axios');
const cheerio = require('cheerio');

//get all links from this page where $("div[id='atozindex'] a")

const parent = 'http://catalog.illinois.edu/undergraduate/'
const node = '.courselistcomment'
const selectEach = "div[id='atozindex'] a"



const scrape = async (url) => {
	console.log(url)
	try {
		const { data } = await axios.get(url)
		const $ = cheerio.load(data)
		const scrapedData = []
		$(node).each((_idx, el) => {
			const eachScrape = $(el).text()
			scrapedData.push(eachScrape)
		});
		console.log(scrapedData)
	} catch (error) {
		// throw error;
	}
};


const getUrls = async (url) => {
	try {
		//get parent url links
		const { data } = await axios.get(url)
		const $ = cheerio.load(data)

		let scrapedUrls = []
		$(selectEach).each((_idx, el) => {
			const eachScrape = $(el).attr('href')
			scrapedUrls.push(eachScrape)
		});
		//build formated array of links
		//NEED TO FIX FOR DEGREES WITH CONCENTRATIONS
		//some <li> have <ul> those are the ones with concentrations
		scrapedUrls = scrapedUrls.filter(url => url != '#header')
		scrapedUrls = scrapedUrls.filter(url => url != undefined)
		let sliced = scrapedUrls.slice(0,4)
		// console.log(sliced)
		scrapedUrls = sliced.map(url => `http://catalog.illinois.edu${url}#degreerequirementstext`)
// console.log(scrapedUrls)

	scrapedUrls.forEach(element => scrape(element))
		

		//  return scrapedUrls;
	} catch (error) {
		// throw error;
	}
};

getUrls(parent)






