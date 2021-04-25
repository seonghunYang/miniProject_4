const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require("fs");

const ROOT_LINK = "http://news.google.com";

exports.crawling = async (keyword) => {
	try {
		const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox']});
		const page = await browser.newPage();
		await page.goto(`${ROOT_LINK}/search?q=${keyword}%20when%3A1d&hl=ko&gl=KR&ceid=KR%3Ako`);
		const pageTags = await page.content();
		const $ = cheerio.load(pageTags);
		
		const keywordNews = getNews($);
		
		console.log(keywordNews);
		await browser.close();
	} catch (err) {
		console.log(err);
  }
};

function getNews($) {
	let newsList = [];
	const newsHtml = $(".lBwEZb > .NiLAwe > .xrnccd > article > h3 > a");
	newsHtml.each((index, list) => {
		const title = $(list).text()
		let hrefAttr = $(list).attr('href');
		const link = `${ROOT_LINK}${hrefAttr.substring(1, hrefAttr.length)}`;
		newsList.push({
			title: title,
			link: link
		});
	});
	return newsList;
}