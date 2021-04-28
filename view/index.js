const keyword_survey_template = require('../static/template/keyword_survey')
const header_template = require('../static/template/header');
const keywords = require('../static/data/keywords');

exports.bot_install_msg = {
    "text": "뉴스 끌올ing 봇을 설치해보세요!",
    "blocks": [
    header_template.header(""),
    {
      "type": "text",
      "text": "*안녕하세요* 😊",
      "markdown": true
    },
    {
      "type": "text",
      "text": "저는 각종 *키워드별 뉴스* 📰를\n *끌올(ing)👆* 하는 봇이에요!",
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
            "value": "keyword_select_msg",
            "blocks": [{
                    "type": "label",
                    "text": "*끌올(ing) 👆* 하실 시간을 정해주세요!\n\n설정하신 시간마다 뉴스를 보내드릴게요😆",
                    "markdown": true
                },
                {
                    "type": "input",
                    "name": "time",
                    "required": false,
                    "placeholder": "ex) 12:30"
                }
            ]
        }
    }
}

exports.keyword_select_msg = () => {
    return {
        text: '키워드 고르기',
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
        ],
    }
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