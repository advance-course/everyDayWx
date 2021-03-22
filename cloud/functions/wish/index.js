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
    const wish = db.collection('wish2');
    const couple = db.collection('couple');
    const app = new TcbRouter({
        event
    });

    /**
     * 创建情侣心愿
     * @param {couple_id} 用户couple_id
     * @param {title} 心愿标题
     */
    app.router('v1/create', async ctx => {
        console.log(event)
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

            const wish2 = db.collection('wish').orderBy('modifyTime', 'desc');
            const result = await wish2.where({
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
            const lover_open_id = OPENID === coupleInfo.user_open_id1 ? coupleInfo.user_open_id2 : coupleInfo.user_open_id1
            const list = wishData.data.map(wish => {
                const data = {
                    ...wish,
                    host_finish: ((wish.finisher.findIndex(finisher => finisher === OPENID)) !== -1),
                    lover_finish: wish.finisher.findIndex(finisher => finisher === lover_open_id) !== -1,
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

    return app.serve();
}