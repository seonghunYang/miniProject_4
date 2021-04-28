// routes/index.js
const express = require('express');
const router = express.Router();
const libKakaoWork = require('../libs/kakaoWork');

// 크롤러 부분 import
const crawler = require('../libs/crawling');

// view 부분 import
const view = require('../view');
const KeywordService = require('./KeywordService');
const ScheduleService = require('./ScheduleService');

router.get('/', async (req, res, next) => {

    const users = await libKakaoWork.getUserList();
    const conversations = await Promise.all(
        users.map((user) => libKakaoWork.openConversations({
            userId: user.id
        }))
    );


    const messages = await Promise.all([
        conversations.map((conversation) =>
            libKakaoWork.sendMessage({
                conversationId: conversation.id,
                ...view.bot_install_msg
            })
        ),
    ])

    res.json("OK");
});


router.post('/request', async (req, res, next) => {
    const {
        message,
        value
    } = req.body;

    switch (value) {

        case 'keyword_survey':
            return res.json(view.keyword_survey());
            break;

        case 'time_select_modal':
            return res.json(view.time_select_modal());
            break;

        default:
    }

    res.json("OK");
});


router.post('/callback', async (req, res, next) => {
    const {
        message,
        actions,
        action_time,
        value
    } = req.body;
    switch (value) {
		case 'check_and_set_time_service':
			if(ScheduleService.is_valid_time(actions.hour, actions.minute)){
				const hour = Number(actions.hour);
				const minute = Number(actions.minute);
				ScheduleService.create_job_and_set_rule(
					message.user_id,
					hour,
					minute
				);
				ScheduleService.send_set_rule_ok_callback_msg(
					message.conversation_id,
					hour,
					minute
				);
			}else{
				ScheduleService.send_set_rule_fail_callback_msg(
					message.conversation_id
				);
			}
			break;
        case 'keyword_survey_results':
            await KeywordService.send_keyword_survey_result_msg(
                actions.keyword_select,
                message.conversation_id
            );
            break;

        case 'keyword_select_msg':
            await KeywordService.send_keyword_select_msg(
                message.conversation_id
            );
            break;

        default:
    }

    res.json("OK");

});

module.exports = router;