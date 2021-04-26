exports.crawling = () => {
	const request = require("request");
	const cheerio = require("cheerio");
	const iconv = require("iconv-lite");

	// keyword : ����:all, �û�:sisa, ������:spo, ����:interest
	// ��ġ:pol, ��ȸ:soc, ����:int, IT:its

	const getNews = (keyword) => {
  	request(
  	{
    	url: "https://news.nate.com/rank/interest?sc=" + keyword,
    	method: "GET",
    	encoding: null,
  	},

  	(error, response, body) => {
    	if (error) {
      	console.error(error);
      	return;
    }

    if (response.statusCode === 200) {
      	const bodyDecoded = iconv.decode(body, "EUC_KR"); // iconv�� �̿��Ͽ� ���ڵ�
      	const $ = cheerio.load(bodyDecoded);

      	const news_title = $(
        "div.postRankSubjectList.f_clear > div > div"
      	).toArray();

      	const result = [];
      	news_title.forEach((div) => {
        const aFirst = $(div).find("a").first();
        const path = aFirst.attr("href");
        const url = `https:${path}`;
        const title = aFirst.find("Strong").text().trim();
        result.push({
          	url,
          	title,
        });
    });
	console.log(result);
    }
  });
};

getNews("pol");

};