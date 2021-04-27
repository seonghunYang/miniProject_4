// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

// 크롤러 부분 import
const crawler = require('../libs/crawling');

// view 부분 import
const view = require('../view');


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
		    ...view.messages
      })
    ),
  ])
  // 응답값은 자유롭게 작성하셔도 됩니다.
  res.json({
    users,
    conversations,
    messages,
  });
});


// 버튼 클릭시 survey 보내줌
router.post('/request', async (req, res, next) => {
  const { message, value } = req.body;
  switch (value) {
    case 'keyword_survey':
      // 설문조사용 모달 전송
      return res.json(view.keyword_survey);
      break;
    default:
  }
  res.json({});
});


// survey에 대한 callback
router.post('/callback', async (req, res, next) => {
  const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  crawler.crawling(actions.keyword_select).then((result) => {
    let keyword = ""
    switch (actions.keyword_select) {
      case 'all':
        keyword = "종합"
        break;
      case 'sisa':
        keyword = "시사"
        break;
      case 'spo':
        keyword = "스포츠"
        break;
      case 'interest':
        keyword = "연예"
        break;
      case 'pol':
        keyword = "정치"
        break;
      case 'soc':
        keyword = "사회"
        break;
      case 'int':
        keyword = "세계"
        break;
      case 'its':
        keyword = "IT"
        break;
      default:
        
    }
    switch (value) {
      case 'keyword_survey_results':
        // 설문조사 응답 결과 메세지 전송 (3)
        const keyword_survey_results = view.keyword_survey_results(result, keyword)
        libKakaoWork.sendMessage({
          conversationId: message.conversation_id,
          ...keyword_survey_results
        })
        break;
      default:
    }
    res.json({ result: true });
  }).catch(err => {
    console.log(err)
  })
});

module.exports = router;