const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require("fs");
const axios = require("axios");

const ROOT_LINK = "http://news.google.com";

exports.crawling = async (keyword) => {
	try {
		const htmlTags = await getHtmlUsingPupeteer(keyword);
		
		const $ = cheerio.load(htmlTags);
		
		const keywordNews = getNews($);
	} catch (err) {
		console.log(err);
  }
};

function saveKeyWordNews(keyword, newsList) {
	const newsJsonToString = JSON.stringify(newsList, null, 2);
	fs.writeFileSync(`${keyword}.json`, newsJsonToString);
}

function loadKeyWordNews(keyword) {
	let loadedKeyWordNews = fs.readFileSync(`${keyword}.json`);
	loadedKeyWordNews = JSON.parse(loadedKeyWordNews);
	return loadedKeyWordNews
}

async function getHtmlUsingPupeteer(keyword) {
	const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox']});
	const page = await browser.newPage();
	await page.goto(`${ROOT_LINK}/search?q=${keyword}%20when%3A1d&hl=ko&gl=KR&ceid=KR%3Ako`);
	const htmlTags = await page.content();
	await browser.close();
	return htmlTags
}

async function getHtmlUsingAxios(keyword) {
	const url = encodeURI(`${ROOT_LINK}/search?q=${keyword}%20when%3A1d&hl=ko&gl=KR&ceid=KR%3Ako`)
	const page = await axios.get(url);
	await fs.writeFileSync("test2.html", page.data);
	return page.data;
	
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