//index.js
//获取应用实例
const app = getApp();
const { $Toast } = require('../../dist/base/index');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name: 'WeChat'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
    console.log(app.globalData)
    if (app.globalData.userInfo) {
      console.log(1)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUsernfo: true
      })
      console.log(this.data.userInfo);
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(2)
      app.userInfoReadyCallback = res => {
        console.log(5)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      console.log(this.data.userInfo);
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log(3)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    // console.log(4)
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 跳转至发布问卷页面
   */
  nvigateToRealaseSurvey: function(e) {
    wx.navigateTo({
      url: '/pages/releaseSurvey/releaseSurvey',
    })
  },

  /**
   * 跳转至发布简历页面
   */
  nvigateToReleaseResume: function(e) {
    wx.navigateTo({
      url: '/pages/releaseResume/releaseResume',
    })
  },

  /**
   * 显示余额
   */
  nvigateToMoney: function(e) {
    wx.request({
      url: app.globalData.HOST + 'money/',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: app.globalData.openid
      },
      success: function(res) {
        $Toast({
          content: res.data,
          type: 'success'
        });
      }
    })
  },

  /**
   * 跳转至我发布的问卷页面
   */
  nvigateToMySurvey: function(e) {
    wx.navigateTo({
      url: '/pages/mySurvey/mySurvey'
    })
  },

  /**
   * 跳转至我发布的简历页面
   */
  nvigateToMyResume: function(e) {
    wx.navigateTo({
      url: '/pages/myResume/myResume'
    })
  },
})
