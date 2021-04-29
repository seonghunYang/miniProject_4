const keyword_survey_template = require('../static/template/keyword_survey')
const header_template = require('../static/template/header');
const keywords = require('../static/data/keywords');

exports.bot_install_msg = {
    "text": "뉴스 끌올ing 봇을 설치해보세요!",
    "blocks": [
        header_template.header(""),
        {
            "type": "text",
            "text": "*안녕하세요*  😊",
            "markdown": true
        },
        {
            "type": "text",
            "text": "저는 *끌올링(ing) 봇*이라고 해요! \n지금부터, \n\n *키워드별 뉴스 정기 구독 서비스* \n   *'📰 뉴스 끌올링(ing) ⏰'*\n\n의 이용을 도와드릴게요! 💪",
            "markdown": true
        },
        {
            "type": "divider"
        },
        {
            "type": "text",
            "text": "\n*키워드*와 *시간*을 설정해 주시면 \n설정하신 시간마다 ⏰, \n해당 *키워드에 관한 인기 뉴스*를 \n*끌올(ing)* 하실 수 있습니다!\n ",
            "markdown": true
        },
        {
            "type": "section",
            "content": {
                "type": "text",
                "text": "1️⃣ 제일 먼저\n뉴스를 *끌올(ing) 하실*\n*시간*을 설정해 주세요!",
                "markdown": true
            },
            "accessory": {
                "type": "image_link",
                "url": "https://img.icons8.com/wired/2x/timer.png"
            }
        },
        {
            "type": "button",
            "text": "시간 설정",
            "style": "primary",
            "action_type": "call_modal",
            "value": "time_select_modal"
        }
    ]
}

exports.time_select_modal = () => {
    return {
        view: {
            "title": "뉴스 끌올(ing) 시간 설정하기",
            "accept": "확인",
            "decline": "취소",
            "value": "check_and_set_time_service",
            "blocks": [{
                    "type": "label",
                    "text": "*끌올(ing) 👆* 하실 시간을 정해주세요!\n\n설정하신 시간마다 뉴스를 보내드릴게요😆",
                    "markdown": true
                },
				{
                    "type": "input",
                    "name": "time",
                    "required": true,
                    "placeholder": "시간을 입력해주세요! ex) 13:45, 14"
                }
            ]
        }
    }
}

exports.set_rule_ok_callback_msg = (hour, minute) => {
    return {
        text: "시간 설정해주셔서 감사합니다!",
        blocks: [
            header_template.header(""),
			{
                "type": "section",
                "content": {
                    "type": "text",
                    "text": "2️⃣ 다음으로\n시간마다 *끌올(ing) 하실*\n*키워드*를 설정해 주세요!",
                    "markdown": true
                },
                "accessory": {
                    "type": "image_link",
                    "url": "https://img.icons8.com/ios/2x/separate-using-a-key-word.png"
                }
            },
            {
                type: 'button',
                action_type: 'call_modal',
                value: 'keyword_survey',
                text: '키워드 고르기',
                style: 'primary',
            },

        ]
    }
}

exports.set_rule_fail_callback_msg = () => {
    return {
        text: "시간을 다시 설정해주세요😥",
        blocks: [
            header_template.header(""),
            {
                type: 'text',
                text: `시간을 다시 설정해주세요.😥\n\n오후 11시 30분에 *끌올(ing)*하고 싶으시면 23:30으로 적어주세요! \n\n또는\n\n오전 9시에 *끌올(ing)*하고 싶으시면 9로 적어주세요!`
            },
            {
                "type": "button",
                "text": "시간 설정",
                "style": "primary",
                "action_type": 'call_modal',
                "value": "time_select_modal"
            }
        ]
    }
}

exports.set_job_callback_msg = (result, keyword, hour, minute) => {
	const ret = {
        text: '키워드를 이용해 크롤링을 완료했습니다!',
        blocks: [
            header_template.header(keyword)
        ]
    };
	
    for (let i = 0; i < 5; i++) {
        const title = result[i].title;
        const url = result[i].url;
        ret.blocks.push(keyword_survey_template.keyword_survey_result_item(i + 1, title, url));
	}

	ret.blocks.push(
	{
      "type": "divider"
    },{
      "type": "text",
      "text": `*끌올링(ing) 봇*를 설치해주셔서\n 감사드려요!🎉🎉\n\n앞으로 제가 *${hour}시 ${minute === undefined ? "00": minute}분*에 위와 같이\n *끌올(ing)* 해드릴게요!!\n`,
      "markdown": true
    },
	{
      "type": "divider"
    },{
      "type": "text",
      "text": "*끌올링(ing)* 이 어떻게 만들어졌는지 궁금하신가요?\n\n저희팀의 *github*에 놀러오세요!",
      "markdown": true
    },
    {
      "type": "context",
      "content": {
        "type": "text",
        "text": "[*끌올링(ing) 팀*의 기록](https://github.com/seonghunYang/miniProject_4/tree/master)",
        "markdown": true
      },
      "image": {
        "type": "image_link",
        "url": "https://img.icons8.com/bubbles/100/000000/github.png"
      }
    });

    return ret;
}

exports.keyword_survey = () => {

    const options = [];

    for (keyword_eng in keywords) {
        const keyword_kor = keywords[keyword_eng];
        options.push({
            text: keyword_kor,
            value: keyword_eng
        });
    }

    return keyword_survey_template.keyword_survey(options);
}

exports.keyword_survey_results = (result, keyword) => {

    const ret = {
        text: '키워드를 이용해 끌올(ing)을 완료했습니다!',
        blocks: [
            header_template.header(keyword)
        ]
    };

    for (let i = 0; i < 5; i++) {
        const title = result[i].title;
        const url = result[i].url;
        ret.blocks.push(keyword_survey_template.keyword_survey_result_item(i + 1, title, url));
    }

    return ret;
}