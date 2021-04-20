const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router');

cloud.init({
  // env: cloud.DYNAMIC_CURRENT_ENV
  env: 'develop-1gsdlqw8ff792ed2'
});

/**
 * event: 云函数调用时，传入的参数，包括 $url
 */
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const db = cloud.database();
  const user = db.collection('user');
  const couple = db.collection('couple');
  const _ = db.command
  const app = new TcbRouter({
    event
  });

  /**
   * @description 注册
   */
  app.router('v1/register', async (ctx, next) => {
    const _info = {
      openid: OPENID,
      nickName: '',
      avatarUrl: '',
      city: '',
      country: '',
      gender: 1,
      language: 'zh_CN',
      province: '',
      type: 3, // 1: 超级管理员  2: 管理员  3：普通用户  4：付费用户
    }

    console.log(event)

    let userInfo = await user.where({
      openid: OPENID,
    }).field({ openid: false, userInfo: false }).get()

    if (userInfo.data.length > 0) {
      ctx.body = {
        success: true,
        code: 200,
        message: '当前用户已经存在！已返回当前用户信息',
        data: userInfo.data[0]
      }
      return
    }

    if (event.userInfo) {
      delete event.userInfo
    }

    const info = {
      ..._info,
      ...event,
      createTime: new Date().getTime()
    };

    delete info.$url;

    const data = {
      info, 
      lover_user_id:0,
      couple_id:0
    }

    try {
      const res = await user.add({ data: info });
      delete info.openid
      data.host_user_id = res._id
      // ctx.body = { success: true, code: 200, message: '注册成功', data: {...info, _id: res._id}}
      ctx.body = { success: true, code: 200, message: '注册成功', data}
    } catch (e) {
      ctx.body = { success: false, code: e.errCode, message: e.errMsg }
    }
  })

  /**
   * @description 登陆
   */
  app.router('v1/login', async (ctx, next) => {
    try {
      const info = await user.where({
        openid: OPENID,
      }).field({ openid: false, userInfo: false }).get()
      if (info.data.length) {
        res = await couple.where(_.or([
          {
            user_id1: _.eq(info.data[0]._id)
          },
          {
            user_id2: _.eq(info.data[0]._id)
          }
        ])).get()
        
        let lover_user_id, couple_id

        if (res.data.length) {
         lover_user_id = info.data[0]._id === res.data[0].user_id1 ? res.data[0].user_id2 : res.data[0].user_id1
            couple_id = res.data[0]._id
        } else {
         lover_user_id = 0
          couple_id = 0
        }

        ctx.body = {
          success: true,
          code: 200,
          message: '请求成功',
          data: {
            info: info.data[0],
            host_user_id: info.data[0]._id,
            lover_user_id,
            couple_id
          },
        }
        return
      }

      ctx.body = { success: false, code: 40101, message: '无此用户，请注册' }
    } catch (e) {
      ctx.body = { success: false, code: e.errCode, message: e.errMsg }
    }
  })

  /**
   * @description 查询用户基本信息
   * @param {userid} 用户id
   */
  app.router('v1/info', async (ctx, next) => {
    try {
      const res = await user.doc(event.userid).field({
        openid: false,
        userInfo: false
      }).get();
      ctx.body = { success: true, code: 200, message: '请求成功', data: res.data }
    } catch (e) {
      ctx.body = { success: false, code: e.errCode, message: e.errMsg }
    }
  })

  // 修改某用户信息的内容
  app.router('v1/update/info', async (ctx) => {
    const { userid, $url, userInfo, ...other } = event;
    try {
      await user.doc(userid).update({
        data: { ...other }
      })

      ctx.body = { success: true, code: 200, message: '更新成功', data: null }
    } catch (e) {
      ctx.body = { success: false, code: e.errCode, message: e.errMsg }
    }
  })

  /**
   * 查询用户信息分页列表
   * @param {current} 当前页，默认值1
   * @param {pageSize} 每一页大小 默认值10
   * @param {keyword} 通过关键字模糊匹配用户
   */
  app.router('v1/list', async (ctx) => {
    const {
      current = 1, pageSize = 10, keyword = ''
    } = event;
    try {
      let x = user;
      if (keyword) {
        x = await user.where(db.command.or([{
            nickName: db.RegExp({
              regexp: keyword
            })
          },
          {
            _id: db.RegExp({
              regexp: keyword
            })
          }
        ]))
      }
      const count = await x.count();
      const total = count.total || 0;
      let lastPage = false;
      if (current * pageSize >= total) {
        lastPage = true;
      }
      const start = pageSize * (current - 1);
      const list = await x.field({
        openid: false,
        userInfo: false
      }).skip(start).limit(pageSize).get();

      const result = {
        pageSize,
        current,
        lastPage,
        total,
        list: list.data
      };
      ctx.body = { success: true, code: 200, message: '请求成功', data: result }
    } catch (e) {
      ctx.body = { success: false, code: e.errCode, message: e.errMsg }
    }
  })

  // 情侣绑定
  app.router('v1/couple/bind', async (ctx) => {
    const { user_id, lover_user_id } = event;
    try {
      async function checkUnique(userId) {
        const res = await couple.where(_.or([
          {
            user_id1: _.eq(userId)
          },
          {
            user_id2: _.eq(userId)
          }
        ])).get()
        console.log(res)
        if (res.data.length) return false
        return true
      }

      if (!await checkUnique(user_id)) {
        ctx.body = { success: false, code: 001, message: '您已绑定情侣关系，不能重复绑定' }
        return
      }

      if (!await checkUnique(lover_user_id)) {
        ctx.body = { success: false, code: 001, message: '对方已绑定情侣关系，不能重复绑定' }
        return
      }

      const data = {
        user_id1: user_id,
        user_id2: lover_user_id
      }
      const res = await couple.add({ data });
      ctx.body = { success: true, code: 200, message: '绑定成功', data: { couple_id: res._id } }
    } catch (e) {
      ctx.body = { success: false, code: e.errCode, message: e.errMsg }
      return
    }
  })

  /**
   * @description 查询用户基本信息
   * @param {openId} 用户openId
   */
  app.router('v1/infoV2', async ctx => {
     const { openId } = event
    try {
      const res = await user.where({ openid: openId }).get();
      ctx.body = { success: true, code: 200, message: '请求成功', data: res.data[0] }
    } catch (e) {
      ctx.body = { success: false, code: e.errCode, message: e.errMsg }
    }
  })

  return app.serve();
}