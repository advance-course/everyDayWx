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
    const user = db.collection('user');
    const couple = db.collection('couple');
    const _ = db.command
    const app = new TcbRouter({
        event
    });
    const info = await user.where({ openid: OPENID, }).get()

    /**
     * 创建情侣心愿
     * @param {couple_id} 用户couple_id
     * @param {title} 心愿标题
     */
    app.router('v1/create', async ctx => {
        const { couple_id, title } = event
        try {
            await wish.add({
                data: {
                    couple_id,
                    title,
                    state: 1, // 1创建 2本人完成 3对方完成 4双方完成
                    createTime: db.serverDate(),
                    modifyTime: db.serverDate(),
                    finisher: []
                }
            })
            ctx.body = {
                success: true,
                code: 200,
                message: '请求成功',
                data: {
                    couple_id,
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
     * @param {couple_id} 用户couple_id
     * @param {current} 当前页，默认值1
     * @param {pageSize} 每一页大小 默认值10
     */
    app.router('v1/all', async ctx => {
        const { current = 1, pageSize = 10, couple_id } = event;
        console.log(event)
        try {
            if (!couple_id) {
                ctx.body = {
                    success: false,
                    message: '无couple_id'
                }
                return
            }

            const wish = db.collection('wish').orderBy('modifyTime', 'desc');
            const result = await wish.where({
                couple_id
            })
            const count = await result.count()
            const total = count.total || 0
            let lastPage = false;
            if (current * pageSize >= total) {
                lastPage = true;
            }
            const start = pageSize * (current - 1);
            const wishData = await result.field({
                couple_id: false
            }).skip(start).limit(pageSize).get();

            const { data: coupleInfo } = await couple.doc(couple_id).get()
            const lover_user_id = info.data[0]._id === coupleInfo.user_id1 ? coupleInfo.user_id2 : coupleInfo.user_id1
            const list = wishData.data.map(wish => {
                const data = {
                    ...wish,
                    host_finish: ((wish.finisher.findIndex(finisher => finisher === info.data[0]._id)) !== -1),
                    lover_finish: wish.finisher.findIndex(finisher => finisher === lover_user_id) !== -1,
                    progress: wish.finisher.length / 2 * 100
                }
                delete data.finisher
                return data
            })

            const data = {
                pageSize,
                current,
                lastPage,
                total,
                list
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
                couple_id: false
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

    /**
    * 完成情侣心愿
    * @param {id} 心愿id
    * @param {userId} 心愿标题
    */
    app.router('v1/finish', async ctx => {
        const { _id, userId } = event
        console.log(event)
        try {
            const res = await wish.doc(_id).update({
                data: {
                    finisher: _.push(userId)
                }
            })
            console.log(res)
            ctx.body = {
                success: true,
                code: 200,
                message: '请求成功',
            }
        } catch (error) {
            console.error(error)
            ctx.body = {
                success: false,
                code: error.errCode,
                message: error.errMsg
            }
        }
    })

    /**
    * 删除情侣心愿
    * @param {_id} 心愿id
    */
    app.router('v1/delete', async ctx => {
        const { _id } = event
        console.log(event)
        try {
            const res = await wish.doc(_id).remove()
            console.log(res)
            ctx.body = {
                success: true,
                code: 200,
                message: '请求成功',
            }
        } catch (error) {
            console.error(error)
            ctx.body = {
                success: false,
                code: error.errCode,
                message: error.errMsg
            }
        }
    })

    return app.serve();
}