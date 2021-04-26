exports.crawling = (keyward_num) => {
	const request = require("request");
	const cheerio = require("cheerio");
	const iconv = require("iconv-lite");
  let keyward = ""
  
  switch (keyward_num) {
    case 1:
      keyward = 'all'
      break;
    case 2:
      keyward = 'sisa'
      break;
    default:
  }
	// keyword : 종합:all, 시사:sisa, 스포츠:spo, 연예:interest
	// 정치:pol, 사회:soc, 세계:int, IT:its

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
      	const bodyDecoded = iconv.decode(body, "EUC_KR"); // iconv를 이용하여 디코드
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
    // console.log(result);
      }
    });
  };

  return getNews(keyward);

};