const libKakaoWork = require('../libs/kakaoWork');
const crawler = require('../libs/crawling');
const view = require('../view');
const keywords = require('../static/data/keywords');

exports.send_keyword_select_msg = async (conversation_id) => {
	                await libKakaoWork.sendMessage({
                    conversationId: conversation_id,
                    ...view.keyword_select_msg()
                })
}

exports.send_keyword_survey_result_msg = async (selected_keyword, conversation_id) => {
	crawler.crawling(selected_keyword)
	.then((result) => {
		const keyword = keywords[selected_keyword];
		libKakaoWork.sendMessage({
			 conversationId: conversation_id,
			...view.keyword_survey_results(result, keyword)
		});
	})
}
    