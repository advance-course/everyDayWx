import {Config} from '@tarojs/taro'

const config: Config = {
  pages: [
    'pages/home/index/index',
    'pages/explore/index/index',
    'pages/profile/index/index',
    
    
    'pages/home/login/index',
    'pages/home/wish/index/index',
    'pages/home/wish/edit/index',
    'pages/home/lover/index/index',

    'pages/profile/ui/index',
    'pages/profile/ui/module/index',
    'pages/profile/ui/basic/button/index',
    'pages/profile/users/index/index',
    'pages/profile/users/detail/index',
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#7d88a2',
    selectedColor: '#408bfd',
    backgroundColor: '#fcfcfc',
    borderStyle: 'white',
    list: [{
      pagePath: 'pages/home/index/index',
      text: '首页',
      iconPath: 'assets/tabbar/home.png',
      selectedIconPath: 'assets/tabbar/home-hl.png'
    }, {
      pagePath: 'pages/explore/index/index',
      text: '发现',
      iconPath: 'assets/tabbar/news.png',
      selectedIconPath: 'assets/tabbar/news-hl.png'
    }, {
      pagePath: 'pages/profile/index/index',
      text: '我的',
      iconPath: 'assets/tabbar/my.png',
      selectedIconPath: 'assets/tabbar/my-hl.png'
    }]
  },  
  cloud: true
}

export default config
