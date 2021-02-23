// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

cloud.init({
    // env: cloud.DYNAMIC_CURRENT_ENV
    env: 'develop-1gsdlqw8ff792ed2'
});

// 云函数入口函数
exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()

    const db = cloud.database();
    const wish = db.collection('wish');
    const app = new TcbRouter({
        event
    });

    /**
     * 创建情侣心愿
     * @param {openid} 用户openId
     * @param {title} 心愿标题
     */
    app.router('v1/create', async ctx => {
        const { openid, title } = event
        try {
            await wish.add({
                data: {
                    openid,
                    title
                }
            })
            ctx.body = {
                success: true,
                code: 200,
                message: '请求成功',
                data: {
                    openid,
                    title
                }
            }
        } catch (error) {
            ctx.body = {
                success: false,
                code: error.errCode,
                message: error.errMsg
            }
        }
    })

    return app.serve();
}