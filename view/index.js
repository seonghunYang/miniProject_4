exports.messages = {
    text: '키워드 고르기',
    blocks: [{
            type: 'header',
            text: '📰 키워드 뉴스 알림',
            style: 'yellow',
        },
        {
            type: 'text',
            text: '어떤 뉴스를 보고 싶으신지\n 키워드를 골라주세요!',
            markdown: true,
        },
        {
            type: 'button',
            action_type: 'call_modal',
            value: 'keyward_survey',
            text: '키워드 고르기',
            style: 'default',
        },
    ],
}

exports.keyward_survey = {
    view: {
        title: '키워드 선택',
        accept: '키워드 전송하기',
        decline: '취소',
        value: 'keyward_survey_results',
        blocks: [{
                type: 'label',
                text: '키워드를 알려주세요',
                markdown: false,
            },
            {
                type: 'select',
                name: 'keyward_num',
                required: true,
                options: [{
                        text: '종합',
                        value: '1',
                    },
                    {
                        text: '시사',
                        value: '2',
                    },
                    {
                        text: '스포츠',
                        value: '3',
                    },
                    {
                        text: '연예',
                        value: '4',
                    },
                    {
                        text: '기술',
                        value: '5',
                    },
                ],
                placeholder: 'keyward',
            }
        ],
    },
}

exports.keyward_survey_results = (actions, action_time, crawling_data) => {
    return {
        text: '키워드를 이용해 크롤링을 완료했습니다!',
        blocks: [{
                type: 'text',
                text: '설문조사에 응해주셔서 감사합니다! 🎁',
                markdown: true,
            },
            {
                type: 'text',
                text: '*답변 내용*',
                markdown: true,
            },
            {
                type: 'description',
                term: '평점',
                content: {
                    type: 'text',
                    text: actions.rating,
                    markdown: false,
                },
                accent: true,
            },
            {
                type: 'description',
                term: '바라는 점',
                content: {
                    type: 'text',
                    text: actions.wanted,
                    markdown: false,
                },
                accent: true,
            },
            {
                type: 'description',
                term: '시간',
                content: {
                    type: 'text',
                    text: action_time,
                    markdown: false,
                },
                accent: true,
            },
        ],
    }
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