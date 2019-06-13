// pages/home/home.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    surveys: [
      { id: 1, title: 'task1', description: '问卷1' },
      { id: 2, title: 'taks2', description: '问卷2' },
      { id: 3, title: 'taks3', description: '问卷3' }
    ]
  },

  search () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  wxSearchInput () {
    this.search()
  },

  /*
  跳转至问卷详情页面
  */
  nvigateToDetail() {
    wx.navigateTo({
      url: '/pages/surveydetail/surveydetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     if (app.globalData.userInfo) {
      console.log(1)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(2)
      app.userInfoReadyCallback = res => {
        console.log(5)
        app.globalData.userInfo = res.userInfo
        this.login()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log(3)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(4)
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.login()
  },

  /**
   * 
   */
  login: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.request({
          url: 'http://lynb.cn1.utools.club/login/',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            // nickName: app.globalData.userInfo.nickName,
            // avatarUrl: app.globalData.userInfo.avatarUrl,
          },
          success: function(res1) {
            console.log(res1);       
          },
          fail: function(error) {console.log('fail')}
        })
      }
    });
    this.setData({
      login: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})