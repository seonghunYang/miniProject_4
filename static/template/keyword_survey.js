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
                text: '선택하신 *키워드와 관련된 뉴스*를\n설정하신 시간에 *끌올(ing)* 해드릴게요!😊\n\n 키워드를 설정하시면,\n 끌올(ing)된 뉴스📰를 예시로 보내드립니다! \n\n',
                markdown: true,
            },
            {
                type: 'label',
                text: '다음의 *키워드* 중 한가지를 선택해주세요!',
                markdown: true,
            },
            {
                type: 'select',
                name: 'keyword_select',
                required: true,
                options: options,
                placeholder: '키워드 선택',
            },
            {
                type: 'label',
                text: '',
                markdown: true,
            },
        ],
    }
}}