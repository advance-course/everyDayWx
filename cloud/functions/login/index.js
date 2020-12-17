const cloud = require('wx-server-sdk')

cloud.init({
  env: 'develop-1gsdlqw8ff792ed2'
})

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  return {
    openid: cloud.getWXContext().OPENID
  }
}

