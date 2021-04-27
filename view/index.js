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

	// keyword : 종합:all, 시사:sisa, 스포츠:spo, 연예:interest
	// 정치:pol, 사회:soc, 세계:int, IT:its

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
                name: 'keyward',
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
                placeholder: 'keyward',
            }
        ],
    },
}

exports.keyward_survey_results = (result, keyward) => {
    return {
        text: '키워드를 이용해 크롤링을 완료했습니다!',
        blocks: [{
                type: 'header',
                text: `📰 ${keyward} 키워드 뉴스 알림`,
                style: 'yellow',
            },
            {
              type: "context",
              content: {
                type:"text",
                text: `[${result[0].title}](${result[0].url})`,
                markdown: true
              },
              image: {
                type: "image_link",
                url: "https://t1.kakaocdn.net/kakaowork/resources/block-kit/context/ppt@3x.png"
              }
            },
            {
              type: "context",
              content: {
                type:"text",
                text: `[${result[1].title}](${result[1].url})`,
                markdown: true
              },
              image: {
                type: "image_link",
                url: "https://t1.kakaocdn.net/kakaowork/resources/block-kit/context/pdf@3x.png"
              }
            },
            {
              type: "context",
              content: {
                type:"text",
                text: `[${result[2].title}](${result[2].url})`,
                markdown: true
              },
              image: {
                type: "image_link",
                url: "https://t1.kakaocdn.net/kakaowork/resources/block-kit/context/etc@3x.png"
              }
            },
            {
              type: "context",
              content: {
                type:"text",
                text: `[${result[3].title}](${result[3].url})`,
                markdown: true
              },
              image: {
                type: "image_link",
                url: "https://t1.kakaocdn.net/kakaowork/resources/block-kit/context/ppt@3x.png"
              }
            },
            {
              type: "context",
              content: {
                type:"text",
                text: `[${result[4].title}](${result[4].url})`,
                markdown: true
              },
              image: {
                type: "image_link",
                url: "https://t1.kakaocdn.net/kakaowork/resources/block-kit/context/audio@3x.png"
              }
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