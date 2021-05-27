// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'develop-1gsdlqw8ff792ed2'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const db = cloud.database()
  const chat = db.collection('chat')
  const _ = db.command
  const app = new TcbRouter({
    event
  })

  /**
   * 查询聊天记录
   * @param {coupleId} 情侣ID
   */
  // app.router('v1/chatList', async ctx => {
  //   const { coupleId } = event
  //   const doc = {
  //     coupleId,
  //   }
  //   try {
  //     const { data: chatList } = await chat.where(doc).orderBy('sendTime', 'asc').get()
  //     ctx.body = {
  //       success: true,
  //       code: 200,
  //       message: '请求成功',
  //       data: {
  //         chatList
  //       }
  //     }
  //   } catch (error) {
  //     ctx.body = {
  //       success: false,
  //       code: error.errCode,
  //       message: error.errMsg
  //     }
  //   }
  // })

  /**
   * 查询聊天记录
   * @param {coupleId} 情侣ID
   */
  app.router('v1/chatList', async (ctx) => {
    let { current = 1, pageSize = 10, total, coupleId } = event
    let result,
      lastPage = false
    try {
      if (total === -1) {
        result = await chat.where({ coupleId }).orderBy('sendTime', 'desc')
        const count = await result.count()
        total = count.total || 0
      } else {
        result = await chat.where({ coupleId }).orderBy('sendTime', 'desc').limit(total)
      }
      if (current * pageSize >= total) {
        lastPage = true
      }
      const start = pageSize * (current - 1)
      const list = await result.skip(start).limit(pageSize).get()
      const data = {
        pageSize,
        current,
        lastPage,
        total,
        list: list.data
      }
      ctx.body = {
        success: true,
        code: 200,
        message: '请求成功',
        data
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
   * 查询最新一条聊天记录
   * @param {coupleId} 情侣ID
   */
  app.router('v1/chatListV2', async (ctx) => {
    let { userId } = event
    try {
      const result = await chat.where({ userId }).orderBy('sendTime', 'desc').limit(1).get()
      ctx.body = {
        success: true,
        code: 200,
        message: '请求成功',
        data: result.data[0]
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
   * 发送文字消息
   * @param {text} 消息内容
   */
  app.router('v1/send/text', async (ctx) => {
    const { coupleId, userId, text } = event
    const doc = {
      coupleId,
      userId: userId,
      msgType: 'text',
      textContent: text,
      sendTime: Date.now()
    }
    try {
      await chat.add({ data: doc })
      ctx.body = {
        success: true,
        code: 200,
        message: '请求成功',
        data: doc
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

  return app.serve()
}
