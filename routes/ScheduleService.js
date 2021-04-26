// const JobManager = require('../libs/schedule/JobManager');
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