const JobManager = require('../libs/schedule/JobManager');
const libKakaoWork = require('../libs/kakaoWork');
const keywords = require('../static/data/keywords');
const crawler = require('../libs/crawling');
const view = require('../view');

exports.send_app_install_message_all_users = async() => {
    const users = await libKakaoWork.getUserList();
    const conversations = await Promise.all(
        users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
    );
    const messages = await Promise.all([
        conversations.map((conversation) =>
            libKakaoWork.sendMessage({
                conversationId: conversation.id,
                ...view.app_install
            })
        ),
    ]);
    return { users, conversations, messages };
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

exports.send_set_job_callback_msg = (user_id ,selected_keyword, conversation_id) => {
	crawler.crawling(selected_keyword)
			.then((result) => {
			const keyword = keywords[selected_keyword];
			libKakaoWork.sendMessage({
				conversationId: conversation_id,
				...view.set_job_callback_msg(
					result, 
					keyword, 
					JobManager.getHour(user_id), 
					JobManager.getMinute(user_id))
			})
		})
}

exports.is_valid_time = (time) => {
	const hour = exports.getHour(time);
	const minute = exports.getMinute(time);
	return isValidHour(hour) && isValidMinute(minute);
}

exports.create_job_and_set_rule = (user_id, hour,minute) => {
	JobManager.createJob(user_id);
	JobManager.setJobRule(user_id, hour, minute);
}

exports.send_set_rule_ok_callback_msg = async (conversation_id, hour, minute) => {
	await libKakaoWork.sendMessage({
		conversationId: conversation_id,
		...view.set_rule_ok_callback_msg(hour, minute)
	})
}

exports.send_set_rule_fail_callback_msg = async (conversation_id) => {
	await libKakaoWork.sendMessage({
		conversationId: conversation_id,
		...view.set_rule_fail_callback_msg()
	})
}

exports.getHour = (time) => {
	return String(time).split(":")[0];
}

exports.getMinute = (time) => {
	return String(time).split(":")[1];
}

const isValidHour = (hour) => {
	hour = Number(hour);
	return hour >=0 && hour <= 23;
}

const isValidMinute = (minute) => {
	minute = Number(minute);
	return minute >=0 && minute <= 59;
}