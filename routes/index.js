// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

// 크롤러 부분 import
const crawler = require('../libs/crawling');

// view 부분 import
const view = require('../view');
// 키워드 데이터
const keywords = require('../static/data/keywords')


// routing 진입점
router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
  );

  // 생성된 채팅방에 메세지 전송 (3)
  const messages = await Promise.all([
    conversations.map((conversation) =>
      libKakaoWork.sendMessage({
        conversationId: conversation.id,
		    ...view.bot_install_msg
      })
    ),
  ])
  // 응답값은 자유롭게 작성하셔도 됩니다.
  res.json("OK");
});


// 버튼 클릭시 survey 보내줌
router.post('/request', async (req, res, next) => {
  const { message, value } = req.body;
  switch (value) {
    case 'keyword_survey':
      // 설문조사용 모달 전송
      return res.json(view.keyword_survey());
      break;
	case 'time_select_modal':
		return res.json(view.time_select_modal());
		break;
    default:
  }
  res.json("OK");
});


// survey에 대한 callback
router.post('/callback', async (req, res, next) => {
  const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  crawler.crawling(actions.keyword_select).then((result) => {
    
    switch (value) {
      
		
		case 'keyword_survey_results':
        let keyword = keywords[actions.keyword_select];
        const keyword_survey_results = view.keyword_survey_results(result, keyword)
        libKakaoWork.sendMessage({
          conversationId: message.conversation_id,
          ...keyword_survey_results
        })
        break;
		
		
		
		case 'keyword_select_msg':
        libKakaoWork.sendMessage({
          conversationId: message.conversation_id,
          ...view.keyword_select_msg()
        })
			break;
      default:
    }
    res.json("OK");
  }).catch(err => {
    console.log(err)
  })
});

module.exports = router;