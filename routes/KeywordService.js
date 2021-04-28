const libKakaoWork = require('../libs/kakaoWork');
const crawler = require('../libs/crawling');
const view = require('../view');
const keywords = require('../static/data/keywords');
const JobManager = require('../libs/schedule/JobManager');

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

exports.set_job_and_start = (user_id, selected_keyword, conversation_id) => {
	JobManager.setJobCallback(user_id, () => {
		crawler.crawling(selected_keyword)
			.then((result) => {
			const keyword = keywords[selected_keyword];
			libKakaoWork.sendMessage({
				conversationId: conversation_id,
				...view.keyword_survey_results(result, keyword)
			})
		})
	})
	JobManager.startJob(user_id);
}
