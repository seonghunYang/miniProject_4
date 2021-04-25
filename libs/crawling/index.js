const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require("fs");

const ROOT_LINK = "http://news.google.com";

exports.crawling = async (keyword) => {
	try {
		//puppeteer로 연결

		const htmlTags = await getHtmlUsingPupeteer(keyword);
		
		const $ = cheerio.load(htmlTags);
		
		const keywordNews = getNews($);
		console.log(keywordNews);
	} catch (err) {
		console.log(err);
  }
};

async function getHtmlUsingPupeteer(keyword) {
	const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox']});
	const page = await browser.newPage();
	await page.goto(`${ROOT_LINK}/search?q=${keyword}%20when%3A1d&hl=ko&gl=KR&ceid=KR%3Ako`);
	const htmlTags = await page.content();
	await browser.close();
	return htmlTags
}

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