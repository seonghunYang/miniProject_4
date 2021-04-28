const libKakaoWork = require('../libs/kakaoWork');
const view = require('../view');

exports.send_keyword_select_msg = async(conversation_id) => {
	                await libKakaoWork.sendMessage({
                    conversationId: conversation_id,
                    ...view.keyword_select_msg()
                })
}
