const template = require('../static/template/keyword_survey')
const keywords = require('../static/data/keywords');

exports.messages = {
    text: '키워드 고르기',
    blocks: [{
            type: 'header',
            text: '📰 키워드 뉴스 알림⏰',
            style: 'yellow',
        },
        {
            type: 'text',
            text: '어떤 뉴스를 보고 싶으신지\n 키워드를 골라주세요!😀',
            markdown: true,
        },
        {
            type: 'button',
            action_type: 'call_modal',
            value: 'keyword_survey',
            text: '키워드 고르기',
            style: 'primary',
        },
    ],
}

	// keyword : 종합:all, 시사:sisa, 스포츠:spo, 연예:interest
	// 정치:pol, 사회:soc, 세계:int, IT:its

exports.keyword_survey = () => {
	
	const options = [];
	
	for(keyword_eng in keywords){
		const keyword_kor = keywords[keyword_eng];
		options.push({
			text : keyword_kor,
			value : keyword_eng
		});
	}
	
	return template.keyword_survey(options);
}

exports.keyword_survey_results = (result, keyword) => {
	const ret = {
		text: '키워드를 이용해 크롤링을 완료했습니다!',
        blocks: [{
            type: 'header',
            text: `📰 ${keyword} 뉴스 알림`,
            style: 'yellow',
        }]
	};
	
	for(let i = 0; i < 5; i++){
		const title = result[i].title;
		const url = result[i].url;
		ret.blocks.push(template.keyword_survey_result_item(i+1, title, url));
	}

	return ret;
}

exports.app_install = {
    "text": "봇 승인 여부",
    "blocks": [{
            "type": "header",
            "text": "봇 승인 여부",
            "style": "blue"
        },
        {
            "type": "text",
            "text": "승인하시겠습니까?",
            "markdown": true
        },
        {
            "type": "action",
            "elements": [{
                    "type": "button",
                    "text": "승인",
                    "style": "primary"
                },
                {
                    "type": "button",
                    "text": "거절",
                    "style": "danger",
                    "action_type": "submit_action",
                    "action_name": "reject installing bot",
                    "value": "reject"
                }
            ]
        }
    ]
}