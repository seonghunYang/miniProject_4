const keyword_survey_template = require('../static/template/keyword_survey')
const header_template = require('../static/template/header');
const keywords = require('../static/data/keywords');

exports.messages = {
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
    ],
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
