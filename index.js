const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')





//get all links from this page where $("div[id='atozindex'] a")

const parent = 'http://catalog.illinois.edu/undergraduate/'
const node = '.courselistcomment'
const selectEach = "div[id='atozindex'] li"



const scrape = async (url) => {
	try {
		const { data } = await axios.get(url)
		const $ = cheerio.load(data)
		const scrapedData = []
		$(node).each((_idx, el) => {
			const eachScrape = $(el).text()
			scrapedData.push(eachScrape)
		});

		fs.writeFile('scraper/requirements.csv', scrapedData, 'utf8', function (err) {
			if (err) {
			  console.log('Some error occured - file either not saved or corrupted file saved.');
			} else{
			  console.log('It\'s saved!');
			}
		  });

		// const csv = scrapedData.toString()
		// document.write(csv)

		// console.dir(scrapedData, {'maxArrayLength': null})
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
			//getting the nested majors
			if (el.children.length > 1) {
				let liChildren = el.children
				const subUl = liChildren.find((child) => {
					return child.name === 'ul'
				})

				$(subUl).children().each(function () {
					const li = $(this)
					li.children().each(function () {
						const a = $(this)
						scrapedUrls.push(a.attr('href'))
					})
				})
			}

			else {
				const eachScrape = $(el).children().attr('href')
				scrapedUrls.push(eachScrape)
			}
		});
		
		
		//build formated array of links
		scrapedUrls = [...new Set(scrapedUrls)];
		scrapedUrls = scrapedUrls.filter(url => url != '#header')
		scrapedUrls = scrapedUrls.filter(url => url != '#S')
		scrapedUrls = scrapedUrls.filter(url => url != '/graduate/media/journalism-bs-mj/')
		scrapedUrls = scrapedUrls.map(url => `http://catalog.illinois.edu${url}#degreerequirementstext`)	

		// console.dir(scrapedUrls, {'maxArrayLength': null})
		// console.log(scrapedUrls.length)

	scrapedUrls.forEach(element => scrape(element))

	} catch (error) {
		// throw error;
	}
};

getUrls(parent)






