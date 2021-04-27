exports.keyword_survey_result_item = (number, title, url) => {
	return {
		type: "context",
              content: {
                type:"text",
                text: `[${title}](${url})`,
                markdown: true
              },
              image: {
                type: "image_link",
                url: `https://img.icons8.com/metro/52/000000/${number}-c.png`
              }
	}
}