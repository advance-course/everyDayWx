import {Config} from '@tarojs/taro'

const config: Config = {
  pages: [
    'pages/users/index',
    'pages/home/index',
    'pages/explore/index',
    'pages/profile/index',
    
    'pages/login/index',
    'pages/ui/index',
    'pages/ui/module/index',
    'pages/ui/basic/button/index',
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
      pagePath: 'pages/home/index',
      text: '首页',
      iconPath: 'assets/tabbar/home.png',
      selectedIconPath: 'assets/tabbar/home-hl.png'
    }, {
      pagePath: 'pages/explore/index',
      text: '发现',
      iconPath: 'assets/tabbar/news.png',
      selectedIconPath: 'assets/tabbar/news-hl.png'
    }, {
      pagePath: 'pages/profile/index',
      text: '我的',
      iconPath: 'assets/tabbar/my.png',
      selectedIconPath: 'assets/tabbar/my-hl.png'
    }]
  },  
  cloud: true
}

export default config
