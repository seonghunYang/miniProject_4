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

exports.keyword_survey = (options) => {
		
	return { view : {
        title: '키워드 선택',
        accept: '확인',
        decline: '취소',
        value: 'keyword_survey_results',
        blocks: [{
                type: 'label',
                text: '선택하신 키워드와 관련된 뉴스를 알람으로 보내드립니다!',
                markdown: true,
            },
            {
                type: 'select',
                name: 'keyword_select',
                required: true,
                options: options,
                placeholder: '키워드를 선택해주세요!',
            }
        ],
    }
}}