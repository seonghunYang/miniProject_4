const keyword_survey_template = require('../static/template/keyword_survey')
const header_template = require('../static/template/header');
const keywords = require('../static/data/keywords');

exports.bot_install_msg = {
  "text": "키워드 뉴스 알림 봇을 설치해보세요!",
  "blocks": [
	header_template.header(""),
    {
      "type": "text",
      "text": "안녕하세요. 저는 키워드 뉴스 알림⏰ 봇입니다! \n\n저를 설치하시면 설정하신 시간마다 관심 키워드에 관한 뉴스를 보실 수 있습니다. \n\n설치하실려면 시간설정버튼을 눌려주세요! ",
      "markdown": true
    },
    {
      "type": "button",
      "text": "시간 설정",
      "style": "primary",
	  "action_type":'call_modal',
	  "value" : "time_select_modal"
    }]
}

exports.time_select_modal = () => {
	return {view : {
  "title": "뉴스 알림 시간",
  "accept": "확인",
  "decline": "취소",
  "value": "keyword_select_msg",
  "blocks": [
    {
      "type": "label",
      "text": "키워드 뉴스를 보실 시간을 정해주세요!\n 정상적인 시간을 설정하지 않으시면 알람설정이 되지 않습니다!",
      "markdown": true
    },
    {
      "type": "input",
      "name": "time",
      "required": false,
      "placeholder": "ex) 12:30"
    }
  ]
}}
} 

exports.keyword_select_msg = () => {
	return {
    text: '키워드 고르기',
    blocks: [
		header_template.header(""),
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
    ],}
}

exports.keyword_survey = () => {
	
	const options = [];
	
	for(keyword_eng in keywords){
		const keyword_kor = keywords[keyword_eng];
		options.push({
			text : keyword_kor,
			value : keyword_eng
		});
	}
	
	return keyword_survey_template.keyword_survey(options);
}

exports.keyword_survey_results = (result, keyword) => {
	const ret = {
		text: '키워드를 이용해 크롤링을 완료했습니다!',
        blocks: [
			header_template.header(keyword)
		]
	};
	
	for(let i = 0; i < 5; i++){
		const title = result[i].title;
		const url = result[i].url;
		ret.blocks.push(keyword_survey_template.keyword_survey_result_item(i+1, title, url));
	}

	return ret;
}
