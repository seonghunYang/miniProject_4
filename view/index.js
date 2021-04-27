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
            value: 'keyward_survey',
            text: '키워드 고르기',
            style: 'primary',
        },
    ],
}

	// keyword : 종합:all, 시사:sisa, 스포츠:spo, 연예:interest
	// 정치:pol, 사회:soc, 세계:int, IT:its

exports.keyward_survey = {
    view: {
        title: '키워드 선택',
        accept: '확인',
        decline: '취소',
        value: 'keyward_survey_results',
        blocks: [{
                type: 'label',
                text: '선택하신 키워드와 관련된 뉴스를 알람으로 보내드립니다!',
                markdown: true,
            },
            {
                type: 'select',
                name: 'keyward_select',
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

exports.keyward_survey_results = (result) => {
	

    return {
        text: '키워드를 이용해 크롤링을 완료했습니다!',
        blocks: [{
            type: 'header',
            text: '📰 키워드 뉴스 알림⏰',
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
                type:"image_link",
                url: "https://img.icons8.com/metro/52/000000/1-c.png"
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
                url: "https://img.icons8.com/metro/52/000000/2-c.png"
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
                url: "https://img.icons8.com/metro/52/000000/3-c.png"
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
                url: "https://img.icons8.com/metro/52/000000/4-c.png"
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
                url: "https://img.icons8.com/metro/52/000000/5-c.png"
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