// routes/index.js
const express = require('express');
const router = express.Router();

// const libKakaoWork = require('../libs/kakaoWork');

// 크롤러 부분 import
const crawler = require('../libs/crawling');

// view 부분 import
const view = require('../view');


// routing 진입점
router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
	await crawler.crawling("인공지능");
});


// 버튼 클릭시 survey 보내줌
// router.post('/request', async (req, res, next) => {
//   const { message, value } = req.body;
//   switch (value) {
//     case 'cafe_survey':
//       // 설문조사용 모달 전송
//       return res.json(view.cafe_survey);
//       break;
//     default:
//   }
//   res.json({});
// });


// // survey에 대한 callback
// router.post('/callback', async (req, res, next) => {
//   const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  
//   switch (value) {
//     case 'cafe_survey_results':
//       // 설문조사 응답 결과 메세지 전송 (3)
//       const cafe_survey_results = view.cafe_survey_results(actions, action_time)
//       await libKakaoWork.sendMessage({
//         conversationId: message.conversation_id,
// 		    ...cafe_survey_results
//       });
//       break;
//     default:
//   }
//   res.json({ result: true });
// });

module.exports = router;