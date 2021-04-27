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
// keyWordService import
const KeywordService = require('./KeywordService');


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


router.post('/callback', async (req, res, next) => {
    const {
        message,
        actions,
        action_time,
        value
    } = req.body; 
	
        switch (value) {
				
            case 'keyword_survey_results':
crawler.crawling(actions.keyword_select).then((result) => {
	
				let keyword = keywords[actions.keyword_select];
                const keyword_survey_results = view.keyword_survey_results(result, keyword)
                libKakaoWork.sendMessage({
                    conversationId: message.conversation_id,
                    ...keyword_survey_results
                })
	}).catch(err => {
        console.log(err)
    })
    
                break;

            case 'keyword_select_msg':
                KeywordService.send_keyword_select_msg(message.conversation_id);
                break;
				
            default:
        }
		
        res.json("OK");
		
    
});

module.exports = router;