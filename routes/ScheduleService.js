const JobManager = require('../libs/schedule/JobManager');
const libKakaoWork = require('../libs/kakaoWork');
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

exports.is_valid_time = (hour, minute) => {
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

const isValidHour = (hour) => {
	hour = Number(hour);
	return hour >=0 && hour <= 23;
}

const isValidMinute = (minute) => {
	minute = Number(minute);
	return minute >=0 && minute <= 59;
}