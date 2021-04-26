exports.messages = {
    text: '설문조사 이벤트',
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
        title: '설문조사',
        accept: '설문조사 전송하기',
        decline: '취소',
        value: 'keward_survey_results',
        blocks: [{
                type: 'label',
                text: '카페 평점을 알려주세요',
                markdown: false,
            },
            {
                type: 'select',
                name: 'rating',
                required: true,
                options: [{
                        text: '1점',
                        value: '1',
                    },
                    {
                        text: '2점',
                        value: '2',
                    },
                    {
                        text: '3점',
                        value: '3',
                    },
                    {
                        text: '4점',
                        value: '4',
                    },
                    {
                        text: '5점',
                        value: '5',
                    },
                ],
                placeholder: '평점',
            },
            {
                type: 'label',
                text: '바라는 점이 있다면 알려주세요!',
                markdown: false,
            },
            {
                type: 'input',
                name: 'wanted',
                required: false,
                placeholder: 'ex) 와플을 팔면 좋겠습니다',
            },
        ],
    },
}

exports.keward_survey_results = (actions, action_time) => {
    return {
        text: '설문조사에 응해주셔서 감사합니다!',
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