// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

cloud.init({
    // env: cloud.DYNAMIC_CURRENT_ENV
    env: 'develop-1gsdlqw8ff792ed2'
});

// 云函数入口函数
exports.main = async (event, context) => {
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
                    title,
                    state: 1, // 1创建 2本人完成 3对方完成 4双方完成
                    createTime: db.serverDate(),
                    modifyTime: db.serverDate()
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

    /**
     * 查询情侣所有心愿
     * @param {openid} 用户openId
     * @param {current} 当前页，默认值1
     * @param {pageSize} 每一页大小 默认值10
     */
    app.router('v1/all', async ctx => {
        const { current = 1, pageSize = 10, openid } = event;
        try {
            if (!openid) {
                ctx.body = {
                    success: false,
                    message: '无openId'
                }
                return
            }
            const wish2 = db.collection('wish').orderBy('modifyTime', 'desc');
            const result = await wish2.where({
                openid
            })
            const count = await result.count()
            const total = count.total || 0
            let lastPage = false;
            if (current * pageSize >= total) {
                lastPage = true;
            }
            const start = pageSize * (current - 1);
            const list = await result.field({
                openid: false
            }).skip(start).limit(pageSize).get();
            const data = {
                pageSize,
                current,
                lastPage,
                total,
                list: list.data
            };
            ctx.body = {
                success: true,
                code: 200,
                message: '请求成功',
                data
            }
        } catch (error) {
            ctx.body = {
                success: false,
                code: error.errCode,
                message: error.errMsg
            }
        }
    })

    /**
    * 查询情侣某个心愿
    * @param {id} 心愿id
    */
    app.router('v1/detail', async ctx => {
        try {
            const { data } = await wish.doc(event._id).field({
                openid: false
            }).get()
            ctx.body = {
                success: true,
                code: 200,
                message: '请求成功',
                data
            }
        } catch (error) {
            ctx.body = {
                success: false,
                code: error.errCode,
                message: error.errMsg
            }
        }
    })

    /**
    * 编辑情侣心愿
    * @param {id} 心愿id
    * @param {title} 心愿标题
    */
    app.router('v1/edit', async ctx => {
        const { _id, title } = event
        try {
            await wish.doc(_id).update({
                data: {
                    title,
                    modifyTime: db.serverDate()
                }
            })
            ctx.body = {
                success: true,
                code: 200,
                message: '请求成功',
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