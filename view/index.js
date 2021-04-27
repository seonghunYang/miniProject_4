const template = require('../static/template/keyword_survey')

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

exports.keyword_survey = {
    view: {
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
                options: [{
                        text: '종합',
                        value: 'all',
                    },
                    {
                        text: '시사',
                        value: 'sisa',
                    },
                    {
                        text: '스포츠',
                        value: 'spo',
                    },
                    {
                        text: '연예',
                        value: 'interest',
                    },
                    {
                        text: '정치',
                        value: 'pol',
                    },
                    {
                        text: '사회',
                        value: 'soc',
                    },
                    {
                        text: '세계',
                        value: 'int',
                    },
                    {
                        text: 'IT',
                        value: 'its',
                    },
                ],
                placeholder: '키워드를 선택해주세요!',
            }
        ],
    },
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