// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

// 크롤러 부분 import
const crawler = require('../libs/crawling');
const scheduleService = require('./ScheduleService');
// view 부분 import
const view = require('../view');


// routing 진입점
router.get('/', async(req, res, next) => {
    const result = await scheduleService.send_app_install_message_all_users();
    // 응답값은 자유롭게 작성하셔도 됩니다.
    res.json(
        result
    );
});


// 버튼 클릭시 survey 보내줌
router.post('/request', async(req, res, next) => {
    const { message, value } = req.body;
    switch (value) {
        case 'cafe_survey':
            // 설문조사용 모달 전송
            return res.json(view.cafe_survey);
            break;
        default:
    }
    res.json({});
});


// survey에 대한 callback
router.post('/callback', async(req, res, next) => {
    const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)

    switch (value) {
        case 'cafe_survey_results':
            // 설문조사 응답 결과 메세지 전송 (3)
            const cafe_survey_results = view.cafe_survey_results(actions, action_time)
            await libKakaoWork.sendMessage({
                conversationId: message.conversation_id,
                ...cafe_survey_results
            });
            break;
        default:
    }
    res.json({ result: true });
});

module.exports = router;